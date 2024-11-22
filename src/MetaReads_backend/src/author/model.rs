use std::borrow::Cow;

use candid::{CandidType, Decode, Encode, Principal};
use ic_stable_structures::{storable::Bound, Storable};
use serde::{Deserialize, Serialize};
use validator::Validate;

use crate::book::model::Book;

#[derive(Clone, Debug, CandidType, Deserialize, Serialize)]
pub struct Author {
    pub id: Principal,
    pub name: String,
    pub books: Vec<Book>,
}

impl Storable for Author {
    fn to_bytes(&self) -> std::borrow::Cow<[u8]> {
        Cow::Owned(Encode!(self).unwrap())
    }

    fn from_bytes(bytes: std::borrow::Cow<[u8]>) -> Self {
        Decode!(bytes.as_ref(), Self).unwrap()
    }

    const BOUND: Bound = Bound::Unbounded;
}
#[derive(CandidType, Serialize, Deserialize, Validate)]
pub struct AuthorPayload {
    pub id: Option<Principal>,
    #[validate(length(min = 1))]
    pub name: String,
}
