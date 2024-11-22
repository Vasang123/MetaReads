use candid::Principal;
use validator::Validate;

use super::model::{User, UserPayload};
use crate::error::error::Error;
use crate::USER_STORE;

#[ic_cdk::update]
async fn create_user(payload: UserPayload) -> Result<User, Error> {
    let check_payload = payload.validate();
    if check_payload.is_err() {
        return Err(Error::ValidationErrors {
            message: check_payload.err().unwrap().to_string(),
        });
    }

    if get_user_by_username(&payload.username).is_some() {
        return Err(Error::ValidationErrors {
            message: "Username already exists!".to_string(),
        });
    }

    let user = User {
        id: payload.id,
        username: payload.username,
        password: payload.password.unwrap_or_default(),
        image: payload.image.unwrap_or_default(),
        money: payload.money.unwrap_or(0),
    };
    insert_user(&user);
    Ok(user)
}

#[ic_cdk::query]
fn get_all_user() -> Vec<User> {
    let mut users = Vec::new();
    USER_STORE.with(|user_store| {
        let store = user_store.borrow();

        for (_key, user) in store.iter() {
            users.push(user.clone());
        }
    });
    return users;
}

#[ic_cdk::query]
fn login(username: String, password: String) -> Result<User, Error> {
    match get_user_by_username(&username) {
        Some(user) => {
            if password == user.password {
                return Ok(user);
            }
            Err(Error::NotAuthorized {
                message: format!("Wrong password"),
            })
        }
        None => Err(Error::NotFound {
            message: format!("Username not found"),
        }),
    }
}

#[ic_cdk::query]
fn get_user(id: Principal) -> Result<User, Error> {
    match get_user_by_id(&id) {
        Some(user) => Ok(user),
        None => Err(Error::NotFound {
            message: format!("User Not Found"),
        }),
    }
}

#[ic_cdk::update]
fn update_user(payload: UserPayload) -> Result<User, Error> {
    let id = payload.id;
    match get_user_by_id(&id) {
        Some(mut user) => {
            let check_payload = payload.validate();
            if check_payload.is_err() {
                return Err(Error::ValidationErrors {
                    message: check_payload.err().unwrap().to_string(),
                });
            }
            user.username = payload.username;
            if let Some(password) = payload.password {
                user.password = password;
            }
            if let Some(image) = payload.image {
                user.image = image;
            }

            if let Some(money) = payload.money {
                user.money += money;
            }
            insert_user(&user);
            Ok(user)
        }
        None => {
            return Err(Error::NotFound {
                message: "User not test".to_string(),
            })
        }
    }
}

#[ic_cdk::query]
fn get_user_count() -> Result<u64, Error> {
    let user_count = USER_STORE.with(|user_store| {
        let store = user_store.borrow();
        store.len() as u64
    });
    Ok(user_count)
}

pub fn insert_user(user: &User) {
    USER_STORE.with(|user_store| {
        user_store
            .borrow_mut()
            .insert(user.id.clone(), user.clone());
    });
}

pub fn get_user_by_id(id: &Principal) -> Option<User> {
    USER_STORE.with(|user_store| user_store.borrow().get(id))
}

fn get_user_by_username(username: &String) -> Option<User> {
    USER_STORE.with(|user_store| {
        let store = user_store.borrow();
        for (_key, user) in store.iter() {
            if &user.username == username {
                return Some(user.clone());
            }
        }
        None
    })
}

pub fn add_user_balance(id: &Principal, balance: u64) {
    match get_user_by_id(&id) {
        Some(mut user) => {
            user.money += balance;
            insert_user(&user);
        }
        None => {}
    }
}
pub fn substract_user_balance(id: &Principal, balance: u64) -> Option<User> {
    match get_user_by_id(&id) {
        Some(mut user) => {
            if user.money >= balance {
                user.money -= balance;
                insert_user(&user);
                return Some(user.clone());
            } else {
                None
            }
        }
        None => None,
    }
}
