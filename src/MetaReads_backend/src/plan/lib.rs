use candid::Principal;

use crate::{helper::helper::generate_unique_id, PLAN_STORE};

use super::model::{Plan, PlanPayload};
use crate::error::error::Error;

#[ic_cdk::update]
async fn create_plan(payload: PlanPayload) -> Result<Plan, Error> {
    let id = generate_unique_id().await;
    let plan = Plan {
        id: id,
        name: payload.name,
        price_per_month: payload.price_per_month,
        price_per_year: payload.price_per_year,
    };
    insert_plan(&plan);
    Ok(plan)
}
#[ic_cdk::update]
fn update_plan(payload: PlanPayload) -> Result<Plan, Error> {
    let id = match payload.id {
        Some(ref id) => id,
        None => {
            return Err(Error::NotFound {
                message: "Plan ID is missing".to_string(),
            });
        }
    };
    match get_plan_by_id(&id) {
        Some(mut plan) => {
            plan.name = payload.name;
            plan.price_per_month = payload.price_per_month;
            plan.price_per_year = payload.price_per_year;
            insert_plan(&plan);
            Ok(plan)
        }
        None => Err(Error::NotFound {
            message: format!("Plan with ID {} not found. Cannot update.", id),
        }),
    }
}

#[ic_cdk::query]
fn get_all_plan() -> Vec<Plan> {
    let mut plans = Vec::new();
    PLAN_STORE.with(|plan_store| {
        let store = plan_store.borrow();

        for (_key, plan) in store.iter() {
            plans.push(plan.clone());
        }
    });
    return plans;
}

fn insert_plan(plan: &Plan) {
    PLAN_STORE.with(|plan_store| {
        plan_store.borrow_mut().insert(plan.id, plan.clone());
    })
}
pub fn get_plan_by_id(id: &Principal) -> Option<Plan> {
    PLAN_STORE.with(|plan_store| plan_store.borrow().get(id))
}

pub fn get_plan_by_name(name: &str) -> Option<Plan> {
    PLAN_STORE.with(|plan_store| {
        let store = plan_store.borrow();
        store
            .iter()
            .find(|(_, plan)| plan.name == name)
            .map(|(_, plan)| plan.clone())
    })
}

pub async fn seed_plan(name: String, price_per_month: u64, price_per_year: u64) -> Option<Plan> {
    let payload = PlanPayload {
        id: None,
        name: name,
        price_per_month: price_per_month,
        price_per_year: price_per_year,
    };
    match create_plan(payload).await {
        Ok(plan) => return Some(plan),
        Err(_) => {
            return None;
        }
    }
}
