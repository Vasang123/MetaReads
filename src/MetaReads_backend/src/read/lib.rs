use std::f64::RADIX;
use std::fs::read;

use candid::Principal;

use crate::book::model::Book;
use crate::helper::helper::generate_unique_id;
use crate::user::lib::get_user_by_id;
use crate::{book, READ_STORE};
use crate::{book::lib::get_book_by_id, error::error::Error};

use super::model::{Read, ReadPayload};

#[ic_cdk::update]
async fn create_read(payload: ReadPayload) -> Result<Read, Error> {
    let user_id = payload.user_id;
    let user = match get_user_by_id(&user_id) {
        Some(ref existing_user) => existing_user.clone(),
        None => {
            return Err(Error::NotFound {
                message: "User not found".to_string(),
            })
        }
    };

    let book_id = payload.book_id;
    let book = match get_book_by_id(&book_id) {
        Some(ref existing_book) => existing_book.clone(),
        None => {
            return Err(Error::NotFound {
                message: "Book not found".to_string(),
            })
        }
    };

    let id = generate_unique_id().await;
    let read = Read {
        id,
        user,
        book,
        page_history: payload.page_history.unwrap_or_else(|| 0),
        total_read_duration: payload.total_read_duration.unwrap_or_else(|| 0),
    };
    insert_read(&read);
    Ok(read)
}

#[ic_cdk::update]
async fn update_read(payload: ReadPayload) -> Result<Read, Error> {
    let read_id = match payload.id {
        Some(ref id) => id,
        None => {
            return Err(Error::ValidationErrors {
                message: "Read ID is missing".to_string(),
            })
        }
    };

    let mut read = match get_read_by_id(&read_id) {
        Some(mut read) => read,
        None => {
            return Err(Error::NotFound {
                message: "Read Not Found".to_string(),
            })
        }
    };

    if let Some(page_history) = payload.page_history {
        read.page_history = page_history;
    }
    if let Some(total_read_duration) = payload.total_read_duration {
        read.total_read_duration = total_read_duration;
    }
    insert_read(&read);
    Ok(read)
}

#[ic_cdk::update]
fn delete_read(id: Principal) -> Result<Read, Error> {
    match get_read_by_id(&id) {
        Some(read) => {
            READ_STORE.with(|read_store| read_store.borrow_mut().remove(&id));
            Ok(read)
        }
        None => Err(Error::NotFound {
            message: format!("Read with ID {} not found. Cannot delete.", id),
        }),
    }
}

#[ic_cdk::update]
async fn get_read_by_user(book_id: Principal, user_id: Principal) -> Result<Read, Error> {
    if let Some(read) = READ_STORE.with(|read_store| {
        let store = read_store.borrow();
        store
            .iter()
            .find(|(_, read)| read.user.id == user_id && read.book.id == book_id)
            .map(|(_, read)| read.clone())
    }) {
        return Ok(read);
    }

    let payload = ReadPayload {
        id: None,
        book_id,
        user_id,
        page_history: Some(0),
        total_read_duration: Some(0),
    };

    return create_read(payload).await;
}

#[ic_cdk::query]
fn get_reads_by_user(user_id: Principal) -> Vec<Read> {
    let mut reads = Vec::new();
    READ_STORE.with(|read_store| {
        let store = read_store.borrow();
        for (_key, read) in store.iter() {
            if read.user.id == user_id {
                reads.push(read.clone());
            }
        }
    });
    return reads;
}

fn insert_read(read: &Read) {
    READ_STORE.with(|read_store| read_store.borrow_mut().insert(read.id, read.clone()));
}

fn get_read_by_id(id: &Principal) -> Option<Read> {
    READ_STORE.with(|read_store| read_store.borrow().get(id))
}

pub fn update_book_in_read(book: &Book) {
    let reads_to_update: Vec<Read> = READ_STORE.with(|read_store| {
        let read_store = read_store.borrow();
        read_store
            .iter()
            .filter_map(|(_, read)| {
                if read.book.id == book.id {
                    let mut updated_read = read.clone();
                    updated_read.book = book.clone();
                    Some(updated_read)
                } else {
                    None
                }
            })
            .collect()
    });
    for read in reads_to_update {
        insert_read(&read);
    }
}

pub fn delete_book_in_read(book_id: &Principal) {
    READ_STORE.with(|read_store| {
        let store = read_store.borrow_mut();
        for (_, read) in store.iter() {
            if read.book.id == *book_id {
                match get_read_by_id(&read.id) {
                    Some(read) => {
                        READ_STORE.with(|read_store| read_store.borrow_mut().remove(&read.id));
                    }
                    None => {}
                }
            }
        }
    })
}
