use std::borrow::Cow;

use candid::{CandidType, Decode, Encode, Principal};
use ic_stable_structures::{storable::Bound, Storable};
use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, CandidType, Deserialize, Serialize)]
pub struct Plan {
    pub id: Principal,
    pub name: String,
    pub price_per_month: u64,
    pub price_per_year: u64,
}
impl Storable for Plan {
    fn to_bytes(&self) -> Cow<[u8]> {
        Cow::Owned(Encode!(self).unwrap())
    }

    fn from_bytes(bytes: Cow<[u8]>) -> Self {
        Decode!(bytes.as_ref(), Self).unwrap()
    }

    const BOUND: Bound = Bound::Unbounded;
}

#[derive(CandidType, Serialize, Deserialize, Default)]
pub struct PlanPayload {
    pub id: Option<Principal>,
    pub name: String,
    pub price_per_month: u64,
    pub price_per_year: u64,
}
