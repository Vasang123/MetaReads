use candid::Principal;
use ic_cdk::{call, trap};

pub async fn generate_unique_id() -> Principal {
    let raw_rand_result = call(Principal::management_canister(), "raw_rand", ()).await;

    let bytes: Vec<u8> = match raw_rand_result {
        Ok((response,)) => response,
        Err((_, err)) => {
            trap(&format!("Failed to get seed: {}", err));
        }
    };
    Principal::from_slice(&bytes[..29])
}
