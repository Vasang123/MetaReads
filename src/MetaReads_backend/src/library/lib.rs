use candid::Principal;

use crate::{
    book::{lib::get_book_by_id, model::Book},
    user::lib::get_user_by_id,
};

use super::model::{Library, LibraryPayload};
use crate::{error::error::Error, helper::helper::generate_unique_id, LIBRARY_STORE};

#[ic_cdk::update]
async fn create_library(payload: LibraryPayload) -> Result<Library, Error> {
    let user_id = payload.user_id;
    let user = match get_user_by_id(&user_id) {
        Some(ref existing_user) => existing_user.clone(),
        None => {
            return Err(Error::NotFound {
                message: "User not found".to_string(),
            })
        }
    };

    let id = generate_unique_id().await;
    let library = Library {
        id,
        name: payload.name.unwrap_or_else(|| "...".to_string()),
        user,
        books: Vec::new(),
    };
    insert_library(&library);
    Ok(library)
}

#[ic_cdk::update]
async fn insert_book_to_library(payload: LibraryPayload) -> Result<Library, Error> {
    let book_id = match payload.book_id {
        Some(id) => id,
        None => {
            return Err(Error::ValidationErrors {
                message: "Book ID is missing".to_string(),
            })
        }
    };
    let user_id = payload.user_id;

    let book = match get_book_by_id(&book_id) {
        Some(ref existing_book) => existing_book.clone(),
        None => {
            return Err(Error::NotFound {
                message: "Book not found".to_string(),
            })
        }
    };

    let user = match get_user_by_id(&user_id) {
        Some(ref existing_user) => existing_user.clone(),
        None => {
            return Err(Error::NotFound {
                message: "User not found".to_string(),
            })
        }
    };

    if payload.id.is_none() {
        let id = generate_unique_id().await;
        let mut library = Library {
            id,
            name: "...".to_string(),
            user,
            books: Vec::new(),
        };
        library.books.push(book);
        insert_library(&library);
        Ok(library)
    } else {
        if let Some(library_id) = &payload.id {
            let mut library = match get_library_by_id(library_id) {
                Some(library) => library,
                None => {
                    return Err(Error::NotFound {
                        message: "Library Not Found".to_string(),
                    })
                }
            };

            library.books.push(book);
            insert_library(&library);
            Ok(library.clone())
        } else {
            Err(Error::NotFound {
                message: "Library ID is missing".to_string(),
            })
        }
    }
}

#[ic_cdk::update]
async fn update_library(payload: LibraryPayload) -> Result<Library, Error> {
    let library_id = match payload.id {
        Some(ref id) => id,
        None => {
            return Err(Error::ValidationErrors {
                message: "Library ID is missing".to_string(),
            })
        }
    };

    let mut library = match get_library_by_id(&library_id) {
        Some(mut library) => library,
        None => {
            return Err(Error::NotFound {
                message: "Library Not Found".to_string(),
            })
        }
    };
    if let Some(name) = payload.name {
        library.name = name;
    }
    insert_library(&library);
    Ok(library)
}

#[ic_cdk::update]
fn remove_book_in_library(payload: LibraryPayload) -> Result<Library, Error> {
    let library_id = match payload.id {
        Some(ref id) => id,
        None => {
            return Err(Error::ValidationErrors {
                message: "Library ID is missing".to_string(),
            })
        }
    };
    let book_id = match payload.book_id {
        Some(id) => id,
        None => {
            return Err(Error::ValidationErrors {
                message: "Book ID is missing".to_string(),
            })
        }
    };
    match get_library_by_id(&library_id) {
        Some(mut library) => {
            library.books.retain(|book| book.id != book_id);
            insert_library(&library);
            Ok(library)
        }
        None => {
            return Err(Error::NotFound {
                message: "Library Not Found".to_string(),
            })
        }
    }
}

#[ic_cdk::update]
fn delete_library(id: Principal) -> Result<Library, Error> {
    match get_library_by_id(&id) {
        Some(library) => {
            LIBRARY_STORE.with(|library_store| library_store.borrow_mut().remove(&id));
            Ok(library)
        }
        None => Err(Error::NotFound {
            message: format!("Library with ID {} not found. Cannot delete.", id),
        }),
    }
}

#[ic_cdk::query]
fn get_library_by_user(user_id: Principal) -> Vec<Library> {
    let mut libraries = Vec::new();
    LIBRARY_STORE.with(|library_store| {
        let store = library_store.borrow();
        for (_key, library) in store.iter() {
            if library.user.id == user_id {
                libraries.push(library.clone());
            }
        }
    });
    return libraries;
}

pub fn insert_library(library: &Library) {
    LIBRARY_STORE.with(|library_store| {
        library_store
            .borrow_mut()
            .insert(library.id, library.clone());
    });
}

fn get_library_by_id(id: &Principal) -> Option<Library> {
    LIBRARY_STORE.with(|library_store| library_store.borrow().get(id))
}

pub fn update_book_in_library(book: &Book) {
    let libraries_to_update: Vec<Library> = LIBRARY_STORE.with(|library_store| {
        let library_store = library_store.borrow();

        library_store
            .iter()
            .filter_map(|(_, library)| {
                let mut updated_library = library.clone();
                let mut book_updated = false;

                updated_library.books.iter_mut().for_each(|b| {
                    if b.id == book.id {
                        *b = book.clone();
                        book_updated = true;
                    }
                });
                if book_updated {
                    Some(updated_library)
                } else {
                    None
                }
            })
            .collect()
    });
    for library in libraries_to_update {
        insert_library(&library);
    }
}

pub fn delete_book_in_library(book_id: &Principal) {
    LIBRARY_STORE.with(|library_store| {
        let store = library_store.borrow_mut();
        for (_, mut library) in store.iter() {
            library.books.retain(|book| book.id != *book_id);
        }
    });
}
