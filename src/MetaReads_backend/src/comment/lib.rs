use candid::Principal;
use ic_cdk::api::time;

use crate::book::lib::{get_book_by_id, insert_book};
use crate::user::lib::get_user_by_id;
use crate::{error::error::Error, helper::helper::generate_unique_id};

use super::model::{Comment, CommentPayload};

#[ic_cdk::update]
async fn create_comment(payload: CommentPayload) -> Result<Comment, Error> {
    let user = match get_user_by_id(&payload.user_id) {
        Some(ref user) => user.clone(),
        None => {
            return Err(Error::NotFound {
                message: "User not found".to_string(),
            })
        }
    };

    let mut book = match get_book_by_id(&payload.book_id) {
        Some(ref book) => book.clone(),
        None => {
            return Err(Error::NotFound {
                message: "Book not found".to_string(),
            })
        }
    };

    let id = generate_unique_id().await;
    let comment = Comment {
        id,
        text: payload.text,
        user,
        created_at: time() / 1_000_000_000,
    };
    book.comments.push(comment.clone());
    insert_book(&book);
    Ok(comment)
}

#[ic_cdk::query]
fn get_comment_by_book(book_id: Principal) -> Vec<Comment> {
    match get_book_by_id(&book_id) {
        Some(book) => book.comments.clone(),
        None => Vec::new(),
    }
}
