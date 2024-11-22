use candid::Principal;
use validator::Validate;

use super::model::{Genre, GenrePayload};
use crate::{
    book::{
        lib::{delete_book_related_to_genre, update_genre_in_book},
        model::Book,
    },
    error::error::Error,
    helper::helper::generate_unique_id,
    GENRE_STORE,
};

#[ic_cdk::update]
async fn create_genre(payload: GenrePayload) -> Result<Genre, Error> {
    let check_payload = payload.validate();
    if check_payload.is_err() {
        return Err(Error::ValidationErrors {
            message: check_payload.err().unwrap().to_string(),
        });
    }

    if let Some(_) = get_genre_by_name(&payload.name) {
        return Err(Error::ValidationErrors {
            message: "Genre already exists!".to_string(),
        });
    }

    let id = generate_unique_id().await;
    let genre = Genre {
        id,
        name: payload.name,
        books: Vec::new(),
    };

    insert_genre(&genre);
    Ok(genre)
}

#[ic_cdk::query]
fn get_all_genre() -> Vec<Genre> {
    let mut genres = Vec::new();
    GENRE_STORE.with(|genre_store| {
        let store = genre_store.borrow();

        for (_key, genre) in store.iter() {
            genres.push(genre.clone());
        }
    });
    return genres;
}

#[ic_cdk::update]
fn update_genre(payload: GenrePayload) -> Result<Genre, Error> {
    let id = match payload.id {
        Some(ref id) => id,
        None => {
            return Err(Error::NotFound {
                message: "Genre ID is missing".to_string(),
            });
        }
    };

    match get_genre_by_id(&id) {
        Some(mut genre) => {
            let check_payload = payload.validate();
            if check_payload.is_err() {
                return Err(Error::ValidationErrors {
                    message: check_payload.err().unwrap().to_string(),
                });
            }
            genre.name = payload.name;
            update_genre_in_book(&genre);
            insert_genre(&genre);
            Ok(genre)
        }
        None => Err(Error::NotFound {
            message: format!("Genre with ID {} not found. Cannot update.", id),
        }),
    }
}

#[ic_cdk::update]
fn delete_genre(id: Principal) -> Result<Genre, Error> {
    match get_genre_by_id(&id) {
        Some(genre) => {
            GENRE_STORE.with(|genre_store| genre_store.borrow_mut().remove(&id));
            delete_book_related_to_genre(&id);
            Ok(genre)
        }
        None => Err(Error::NotFound {
            message: format!("Genre with ID {} not found. Cannot delete.", id),
        }),
    }
}

pub fn insert_genre(genre: &Genre) {
    GENRE_STORE.with(|genre_store| {
        genre_store.borrow_mut().insert(genre.id, genre.clone());
    });
}

pub fn get_genre_by_id(id: &Principal) -> Option<Genre> {
    GENRE_STORE.with(|genre_store| genre_store.borrow().get(id))
}

pub fn get_genre_by_name(name: &String) -> Option<Genre> {
    GENRE_STORE.with(|genre_store| {
        let store = genre_store.borrow();
        for (_key, genre) in store.iter() {
            if &genre.name == name {
                return Some(genre.clone());
            }
        }
        None
    })
}

pub fn add_book_in_genre(genre: &mut Genre, book: &Book) {
    genre.books.push(book.clone());
}

pub fn update_book_in_genre(genre: &mut Genre, book: &Book) {
    let book_index = genre.books.iter().position(|b| b.id == book.id);

    if let Some(index) = book_index {
        genre.books[index] = book.clone();
        insert_genre(genre);
    }
}

pub fn delete_book_in_genre(genre: &mut Genre, book_id: &Principal) {
    if genre.books.iter().any(|b| b.id == *book_id) {
        genre.books.retain(|b| b.id != *book_id);
    }
}
pub async fn seed_genre(name: String) -> Option<Genre> {
    let payload = GenrePayload {
        id: None,
        name: name,
    };
    match create_genre(payload).await {
        Ok(genre) => return Some(genre),
        Err(_) => {
            return None;
        }
    }
}
