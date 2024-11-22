use std::borrow::Cow;

use candid::{CandidType, Decode, Encode, Principal};
use ic_stable_structures::{storable::Bound, Storable};
use serde::{Deserialize, Serialize};
use validator::Validate;

use crate::user::model::User;

#[derive(Clone, Debug, CandidType, Deserialize, Serialize)]
pub struct Comment {
    pub id: Principal,
    pub text: String,
    pub user: User,
    pub created_at: u64,
}

impl Storable for Comment {
    fn to_bytes(&self) -> std::borrow::Cow<[u8]> {
        Cow::Owned(Encode!(self).unwrap())
    }

    fn from_bytes(bytes: std::borrow::Cow<[u8]>) -> Self {
        Decode!(bytes.as_ref(), Self).unwrap()
    }

    const BOUND: Bound = Bound::Unbounded;
}

#[derive(CandidType, Serialize, Deserialize, Validate)]
pub struct CommentPayload {
    pub text: String,
    pub user_id: Principal,
    pub book_id: Principal,
}
