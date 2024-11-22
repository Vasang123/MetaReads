use std::borrow::Cow;

use candid::{CandidType, Decode, Encode, Principal};
use ic_stable_structures::{storable::Bound, Storable};
use serde::{Deserialize, Serialize};
use validator::Validate;

use crate::book::model::Book;
#[derive(Clone, Debug, CandidType, Deserialize, Serialize)]
pub struct Genre {
    pub id: Principal,
    pub name: String,
    pub books: Vec<Book>,
}

impl Storable for Genre {
    fn to_bytes(&self) -> Cow<[u8]> {
        Cow::Owned(Encode!(self).unwrap())
    }

    fn from_bytes(bytes: Cow<[u8]>) -> Self {
        Decode!(bytes.as_ref(), Self).unwrap()
    }

    const BOUND: Bound = Bound::Unbounded;
}
#[derive(CandidType, Serialize, Deserialize, Validate)]
pub struct GenrePayload {
    pub id: Option<Principal>,
    #[validate(length(min = 1))]
    pub name: String,
}
