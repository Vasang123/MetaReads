use crate::{
    author::{
        lib::{
            add_book_in_author, delete_book_in_author, get_author_by_id, insert_author,
            update_book_in_author,
        },
        model::Author,
    },
    error::error::Error,
    genre::{
        lib::{
            add_book_in_genre, delete_book_in_genre, get_genre_by_id, insert_genre,
            update_book_in_genre,
        },
        model::Genre,
    },
    helper::helper::generate_unique_id,
    library::lib::{delete_book_in_library, update_book_in_library},
    read::lib::{delete_book_in_read, update_book_in_read},
    BOOK_STORE,
};
use candid::Principal;
use ic_cdk::api::time;
use validator::Validate;

use super::model::{Book, BookPayload, PaginateBookPayload, PaginatedBooks};

#[ic_cdk::update]
async fn create_book(payload: BookPayload) -> Result<Book, Error> {
    let check_payload = payload.validate();
    if check_payload.is_err() {
        return Err(Error::ValidationErrors {
            message: check_payload.err().unwrap().to_string(),
        });
    }

    let genre_id = payload.genre_id;
    let author_id = payload.author_id;

    let mut genre = match get_genre_by_id(&genre_id) {
        Some(ref existing_genre) => existing_genre.clone(),
        None => {
            return Err(Error::NotFound {
                message: "Genre not found".to_string(),
            })
        }
    };
    let mut author = match get_author_by_id(&author_id) {
        Some(ref existing_author) => existing_author.clone(),
        None => {
            return Err(Error::NotFound {
                message: "Author not found".to_string(),
            })
        }
    };

    let id = generate_unique_id().await;
    let book = Book {
        id,
        title: payload.title,
        description: payload.description,
        cover_image: payload.cover_image,
        book_url: payload.book_url,
        author: author.clone(),
        genre: genre.clone(),
        page_count: payload.page_count,
        plan: payload.plan,
        views: 0,
        comments: Vec::new(),
        created_at: time() / 1_000_000_000,
        updated_at: None,
    };
    add_book_in_genre(&mut genre, &book);
    add_book_in_author(&mut author, &book);
    insert_genre(&genre);
    insert_author(&author);
    insert_book(&book);
    Ok(book)
}

#[ic_cdk::query]
fn get_all_book(payload: PaginateBookPayload) -> Result<PaginatedBooks, Error> {
    BOOK_STORE.with(|book_store| {
        let store = book_store.borrow();

        let q = payload.query;
        let mut books: Vec<Book> = store.iter().map(|(_, book)| book.clone()).collect();
        books = books
            .into_iter()
            .filter(|book| {
                book.title.contains(&q)
                    || book.author.name.contains(&q)
                    || book.genre.name.contains(&q)
                    || book.description.contains(&q)
            })
            .collect();
        let total_count = books.len();
        // let start = payload.page * payload.limit;
        // let paginated_books = books.into_iter().skip(start).take(payload.limit).collect();
        let paginated_books = books.into_iter().collect();
        Ok(PaginatedBooks {
            books: paginated_books,
            total_count,
        })
    })
}

#[ic_cdk::update]
fn get_book(id: Principal) -> Result<Book, Error> {
    match get_book_by_id(&id) {
        Some(mut book) => {
            book.views = book.views + 1;
            insert_book(&book);
            Ok(book)
        }
        None => {
            return Err(Error::NotFound {
                message: "Book Not Found".to_string(),
            });
        }
    }
}

#[ic_cdk::query]
fn get_book_detail(id: Principal) -> Result<Book, Error> {
    match get_book_by_id(&id) {
        Some(mut book) => Ok(book),
        None => {
            return Err(Error::NotFound {
                message: "Book Not Found".to_string(),
            });
        }
    }
}

#[ic_cdk::update]
fn update_book(payload: BookPayload) -> Result<Book, Error> {
    let book_id = match payload.id {
        Some(ref id) => id,
        None => {
            return Err(Error::NotFound {
                message: "Book ID is missing".to_string(),
            });
        }
    };
    match get_book_by_id(&book_id) {
        Some(mut book) => {
            let check_payload: Result<(), validator::ValidationErrors> = payload.validate();
            if check_payload.is_err() {
                return Err(Error::ValidationErrors {
                    message: check_payload.err().unwrap().to_string(),
                });
            }

            let new_genre_id = payload.genre_id;
            let new_author_id = payload.author_id;

            let mut new_genre = match get_genre_by_id(&new_genre_id) {
                Some(ref existing_genre) => existing_genre.clone(),
                None => {
                    return Err(Error::NotFound {
                        message: "Genre not found".to_string(),
                    })
                }
            };
            let mut new_author = match get_author_by_id(&new_author_id) {
                Some(ref existing_author) => existing_author.clone(),
                None => {
                    return Err(Error::NotFound {
                        message: "Author not found".to_string(),
                    })
                }
            };

            let mut curr_genre = book.genre.clone();
            let mut curr_author = book.author.clone();

            book.title = payload.title;
            book.description = payload.description;
            book.cover_image = payload.cover_image;
            book.book_url = payload.book_url;
            book.page_count = payload.page_count;
            book.author = new_author.clone();
            book.genre = new_genre.clone();
            book.plan = payload.plan;
            book.updated_at = Some(time() / 1_000_000_000);

            if new_genre_id != curr_genre.id {
                delete_book_in_genre(&mut curr_genre, &book.id);
                add_book_in_genre(&mut new_genre, &book);
            } else {
                update_book_in_genre(&mut new_genre, &book);
            }
            if new_author_id != curr_author.id {
                delete_book_in_author(&mut curr_author, &book_id);
                add_book_in_author(&mut curr_author, &book);
            } else {
                update_book_in_author(&mut new_author, &book);
            }

            update_book_in_library(&book);
            update_book_in_read(&book);

            insert_book(&book);
            Ok(book)
        }
        None => Err(Error::NotFound {
            message: format!("Book with ID {} not found. Cannot update.", book_id),
        }),
    }
}

#[ic_cdk::update]
fn delete_book(id: Principal) -> Result<Book, Error> {
    match get_book_by_id(&id) {
        Some(mut book) => {
            BOOK_STORE.with(|book_store| book_store.borrow_mut().remove(&id));
            delete_book_in_genre(&mut book.genre, &book.id);
            delete_book_in_author(&mut book.author, &book.id);
            delete_book_in_library(&id);
            delete_book_in_read(&id);
            Ok(book)
        }
        None => Err(Error::NotFound {
            message: format!("Book with ID {} not found. Cannot delete.", id),
        }),
    }
}

#[ic_cdk::query]
fn get_popular_book() -> Vec<Book> {
    let mut books: Vec<Book> = Vec::new();
    BOOK_STORE.with(|book_store| {
        let store = book_store.borrow();
        for (_key, book) in store.iter() {
            books.push(book.clone());
        }
    });
    books.sort_by(|a, b| b.views.cmp(&a.views));
    books.into_iter().take(10).collect()
}
#[ic_cdk::query]
fn get_latest_release_book() -> Vec<Book> {
    let mut books: Vec<Book> = Vec::new();
    BOOK_STORE.with(|book_store| {
        let store = book_store.borrow();
        for (_key, book) in store.iter() {
            books.push(book.clone());
        }
    });
    books.sort_by(|a, b| b.created_at.cmp(&a.created_at));
    books.into_iter().take(20).collect()
}
#[ic_cdk::query]
fn get_recommended_book() -> Vec<Book> {
    let mut books: Vec<Book> = Vec::new();
    BOOK_STORE.with(|book_store| {
        let store = book_store.borrow();
        for (_key, book) in store.iter() {
            books.push(book.clone());
        }
    });
    let len = books.len();
    for i in (1..len).rev() {
        let j = ic_cdk::api::time() as usize % (i + 1);
        books.swap(i, j);
    }

    books.into_iter().take(15).collect()
}
#[ic_cdk::query]
fn get_book_by_genre(genre_id: Principal) -> Vec<Book> {
    let mut books: Vec<Book> = Vec::new();
    BOOK_STORE.with(|book_store| {
        let store = book_store.borrow();
        for (_key, book) in store.iter() {
            if book.genre.id == genre_id {
                books.push(book.clone());
            }
        }
    });
    return books;
}

#[ic_cdk::query]
fn search_book(query: String) -> Vec<Book> {
    let mut books: Vec<Book> = Vec::new();
    BOOK_STORE.with(|book_store| {
        let store = book_store.borrow();
        for (_, book) in store.iter() {
            if book.title.contains(&query)
                || book.author.name.contains(&query)
                || book.genre.name.contains(&query)
                || book.description.contains(&query)
            {
                books.push(book.clone());
            }
        }
    });
    return books;
}

pub fn get_book_by_id(id: &Principal) -> Option<Book> {
    BOOK_STORE.with(|book_store| book_store.borrow().get(id))
}

pub fn insert_book(book: &Book) {
    BOOK_STORE.with(|book_store| {
        book_store.borrow_mut().insert(book.id, book.clone());
    });
}

pub fn update_genre_in_book(updated_genre: &Genre) {
    let books_to_update: Vec<Book> = BOOK_STORE.with(|book_store| {
        let book_store = book_store.borrow();
        book_store
            .iter()
            .filter_map(|(_, book)| {
                if book.genre.id == updated_genre.id {
                    let mut updated_book = book.clone();
                    updated_book.genre = updated_genre.clone();
                    Some(updated_book)
                } else {
                    None
                }
            })
            .collect()
    });
    for book in books_to_update {
        insert_book(&book);
    }
}

pub fn update_author_in_book(updated_author: &Author) {
    let books_to_update: Vec<Book> = BOOK_STORE.with(|book_store| {
        let book_store = book_store.borrow();
        book_store
            .iter()
            .filter_map(|(_, book)| {
                if book.author.id == updated_author.id {
                    let mut updated_book = book.clone();
                    updated_book.author = updated_author.clone();
                    Some(updated_book)
                } else {
                    None
                }
            })
            .collect()
    });
    for book in books_to_update {
        insert_book(&book);
    }
}

pub fn delete_book_related_to_author(author_id: &Principal) {
    let books_to_remove: Vec<Principal> = BOOK_STORE.with(|book_store| {
        let store = book_store.borrow();

        store
            .iter()
            .filter_map(|(_, book)| {
                if book.author.id == *author_id {
                    Some(book.id.clone())
                } else {
                    None
                }
            })
            .collect()
    });
    BOOK_STORE.with(|book_store| {
        let mut store = book_store.borrow_mut();
        for book_id in books_to_remove {
            store.remove(&book_id);
        }
    });
}
pub fn delete_book_related_to_genre(genre_id: &Principal) {
    let books_to_remove: Vec<Principal> = BOOK_STORE.with(|book_store| {
        let store = book_store.borrow();

        store
            .iter()
            .filter_map(|(_, book)| {
                if book.genre.id == *genre_id {
                    Some(book.id.clone())
                } else {
                    None
                }
            })
            .collect()
    });
    BOOK_STORE.with(|book_store| {
        let mut store = book_store.borrow_mut();
        for book_id in books_to_remove {
            store.remove(&book_id);
        }
    });
}

pub async fn seed_book(
    title: String,
    description: String,
    cover_image: String,
    author_id: Principal,
    genre_id: Principal,
    page_count: u64,
    book_url: String,
    plan: String,
) -> Option<Book> {
    let payload = BookPayload {
        id: None,
        title,
        description,
        cover_image,
        author_id,
        genre_id,
        page_count,
        book_url,
        plan,
    };
    match create_book(payload).await {
        Ok(book) => Some(book),
        Err(_) => None,
    }
}
