use std::borrow::Cow;

use candid::{CandidType, Decode, Encode, Principal};
use ic_stable_structures::{storable::Bound, Storable};
use serde::{Deserialize, Serialize};
use validator::Validate;

use crate::{author::model::Author, book::model::Book, genre::model::Genre, user::model::User};

#[derive(Clone, Debug, CandidType, Deserialize, Serialize)]
pub struct Read {
    pub id: Principal,
    pub user: User,
    pub book: Book,
    pub page_history: u64,
    pub total_read_duration: u64,
}

impl Storable for Read {
    fn to_bytes(&self) -> std::borrow::Cow<[u8]> {
        Cow::Owned(Encode!(self).unwrap())
    }

    fn from_bytes(bytes: std::borrow::Cow<[u8]>) -> Self {
        Decode!(bytes.as_ref(), Self).unwrap()
    }

    const BOUND: Bound = Bound::Unbounded;
}

#[derive(CandidType, Serialize, Deserialize, Validate)]
pub struct ReadPayload {
    pub id: Option<Principal>,
    pub user_id: Principal,
    pub book_id: Principal,
    pub page_history: Option<u64>,
    pub total_read_duration: Option<u64>,
}
