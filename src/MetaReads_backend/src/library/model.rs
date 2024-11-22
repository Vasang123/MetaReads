use std::borrow::Cow;

use candid::{CandidType, Decode, Encode, Principal};
use ic_stable_structures::{storable::Bound, Storable};
use serde::{Deserialize, Serialize};

use crate::{book::model::Book, user::model::User};

#[derive(Clone, Debug, CandidType, Deserialize, Serialize)]
pub struct Library {
    pub id: Principal,
    pub name: String,
    pub user: User,
    pub books: Vec<Book>,
}
impl Storable for Library {
    fn to_bytes(&self) -> Cow<[u8]> {
        Cow::Owned(Encode!(self).unwrap())
    }

    fn from_bytes(bytes: Cow<[u8]>) -> Self {
        Decode!(bytes.as_ref(), Self).unwrap()
    }

    const BOUND: Bound = Bound::Unbounded;
}

#[derive(CandidType, Serialize, Deserialize)]

pub struct LibraryPayload {
    pub id: Option<Principal>,
    pub name: Option<String>,
    pub book_id: Option<Principal>,
    pub user_id: Principal,
}
