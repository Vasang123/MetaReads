use candid::Principal;
use validator::Validate;

use super::model::{Author, AuthorPayload};
use crate::{
    book::{
        lib::{delete_book_related_to_author, update_author_in_book},
        model::Book,
    },
    error::error::Error,
    helper::helper::generate_unique_id,
    AUTHOR_STORE,
};

#[ic_cdk::update]
async fn create_author(payload: AuthorPayload) -> Result<Author, Error> {
    let check_payload = payload.validate();
    if check_payload.is_err() {
        return Err(Error::ValidationErrors {
            message: check_payload.err().unwrap().to_string(),
        });
    }

    if let Some(_) = get_author_by_name(&payload.name) {
        return Err(Error::ValidationErrors {
            message: "Author already exists!".to_string(),
        });
    }

    let id = generate_unique_id().await;
    let author = Author {
        id,
        name: payload.name,
        books: Vec::new(),
    };
    insert_author(&author);
    Ok(author)
}

#[ic_cdk::query]
fn get_all_author() -> Vec<Author> {
    return AUTHOR_STORE.with(|author_store| {
        let store = author_store.borrow();
        let mut authors = Vec::new();

        for (_key, author) in store.iter() {
            authors.push(author.clone());
        }
        authors
    });
}

#[ic_cdk::update]
fn update_author(payload: AuthorPayload) -> Result<Author, Error> {
    let id = match payload.id {
        Some(ref id) => id,
        None => {
            return Err(Error::NotFound {
                message: "Author ID is missing".to_string(),
            });
        }
    };

    match get_author_by_id(&id) {
        Some(mut author) => {
            let check_payload = payload.validate();
            if check_payload.is_err() {
                return Err(Error::ValidationErrors {
                    message: check_payload.err().unwrap().to_string(),
                });
            }
            author.name = payload.name;
            update_author_in_book(&author);
            insert_author(&author);
            Ok(author)
        }
        None => Err(Error::NotFound {
            message: format!("Author with ID {} not found. Cannot update.", id),
        }),
    }
}

#[ic_cdk::update]
fn delete_author(id: Principal) -> Result<Author, Error> {
    match get_author_by_id(&id) {
        Some(author) => {
            AUTHOR_STORE.with(|author_store| author_store.borrow_mut().remove(&id));
            delete_book_related_to_author(&id);
            Ok(author)
        }
        None => Err(Error::NotFound {
            message: format!("Author with ID {} not found. Cannot delete.", id),
        }),
    }
}

pub fn insert_author(author: &Author) {
    AUTHOR_STORE.with(|author_store| {
        author_store.borrow_mut().insert(author.id, author.clone());
    });
}

pub fn get_author_by_id(id: &Principal) -> Option<Author> {
    AUTHOR_STORE.with(|author_store| author_store.borrow().get(id))
}

pub fn get_author_by_name(name: &String) -> Option<Author> {
    AUTHOR_STORE.with(|author_store| {
        let store = author_store.borrow();
        for (_key, author) in store.iter() {
            if &author.name == name {
                return Some(author.clone());
            }
        }
        None
    })
}

pub fn add_book_in_author(author: &mut Author, book: &Book) {
    author.books.push(book.clone());
}

pub fn update_book_in_author(author: &mut Author, book: &Book) {
    let book_index = author.books.iter().position(|b| b.id == book.id);

    if let Some(index) = book_index {
        author.books[index] = book.clone();
        insert_author(author);
    }
}

pub fn delete_book_in_author(author: &mut Author, book_id: &Principal) {
    if author.books.iter().any(|b| b.id == *book_id) {
        author.books.retain(|b| b.id != *book_id);
    }
}

pub async fn seed_author(name: String) -> Option<Author> {
    let payload = AuthorPayload {
        id: None,
        name: name,
    };
    match create_author(payload).await {
        Ok(author) => return Some(author),
        Err(_) => {
            return None;
        }
    }
}
