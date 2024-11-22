use super::model::{Subscription, SubscriptionPayload};
use crate::{
    error::error::Error,
    helper::helper::generate_unique_id,
    plan::lib::get_plan_by_id,
    user::lib::{get_user_by_id, insert_user, substract_user_balance},
    SUBSCRIPTION_STORE,
};
use candid::{types::principal, Principal};
use ic_cdk::api::time;

#[ic_cdk::update]
pub async fn create_subscription(payload: SubscriptionPayload) -> Result<Subscription, Error> {
    let mut user = match get_user_by_id(&payload.user_id) {
        Some(ref user) => user.clone(),
        None => {
            return Err(Error::NotFound {
                message: "User not found".to_string(),
            })
        }
    };
    let plan = match get_plan_by_id(&payload.plan_id) {
        Some(ref plan) => plan.clone(),
        None => {
            return Err(Error::NotFound {
                message: "Plan not found".to_string(),
            })
        }
    };

    if let Some(existing_subscription) = get_subscription_by_user(payload.user_id) {
        SUBSCRIPTION_STORE.with(|subscription_store| {
            subscription_store
                .borrow_mut()
                .remove(&existing_subscription.id);
        });
    }

    let cost;
    let start_date = time() / 1_000_000_000;
    let end_date;

    if payload.frequency == "Yearly" {
        cost = plan.price_per_year;
        end_date = start_date + 365 * 24 * 60 * 60;
    } else {
        cost = plan.price_per_month;
        end_date = start_date + 30 * 24 * 60 * 60;
    }

    if user.money < cost {
        return Err(Error::PaymentProcessingError {
            message: "Balance not enough".to_string(),
        });
    } else {
        user = match substract_user_balance(&user.id, cost) {
            Some(user) => user,
            None => user,
        };
    }

    let id = generate_unique_id().await;
    let subscription = Subscription {
        id,
        plan,
        user_id: user.id,
        subscription_start_date: start_date,
        subscription_end_date: end_date,
    };
    insert_subscription(&subscription);
    Ok(subscription)
}

#[ic_cdk::query]
fn get_all_subscription() -> Vec<Subscription> {
    SUBSCRIPTION_STORE.with(|subscription_store| {
        let store = subscription_store.borrow();
        store
            .iter()
            .map(|(_, subscription)| subscription.clone())
            .collect()
    })
}

#[ic_cdk::query]
fn get_subscription_by_user(user_id: Principal) -> Option<Subscription> {
    SUBSCRIPTION_STORE.with(|subscription_store| {
        let store = subscription_store.borrow();
        for (_, subscription) in store.iter() {
            if subscription.user_id == user_id {
                return Some(subscription.clone());
            }
        }
        None
    })
}

pub fn insert_subscription(subscription: &Subscription) {
    SUBSCRIPTION_STORE.with(|subscription_store| {
        subscription_store
            .borrow_mut()
            .insert(subscription.id, subscription.clone());
    })
}
