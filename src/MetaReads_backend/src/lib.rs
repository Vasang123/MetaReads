#![allow(non_snake_case)]
use std::cell::RefCell;
use std::time::Duration;

use candid::Principal;
use ic_cdk::{init, post_upgrade, spawn};
use ic_stable_structures::memory_manager::{MemoryId, MemoryManager, VirtualMemory};
use ic_stable_structures::{DefaultMemoryImpl, StableBTreeMap};
use seed::lib::seed_data;

use crate::author::model::{Author, AuthorPayload};
use crate::book::model::{Book, BookPayload, PaginateBookPayload, PaginatedBooks};
use crate::comment::model::{Comment, CommentPayload};
use crate::error::error::Error;
use crate::genre::model::{Genre, GenrePayload};
use crate::library::model::{Library, LibraryPayload};
use crate::plan::model::{Plan, PlanPayload};
use crate::read::model::{Read, ReadPayload};
use crate::subscription::model::{Subscription, SubscriptionPayload};
use crate::user::model::{User, UserPayload};
mod author;
mod book;
mod comment;
mod error;
mod genre;
mod helper;
mod library;
mod plan;
mod read;
mod seed;
mod subscription;
mod user;

type Memory = VirtualMemory<DefaultMemoryImpl>;
type UserStore = StableBTreeMap<Principal, User, Memory>;
type GenreStore = StableBTreeMap<Principal, Genre, Memory>;
type AuthorStore = StableBTreeMap<Principal, Author, Memory>;
type BookStore = StableBTreeMap<Principal, Book, Memory>;
type LibraryStore = StableBTreeMap<Principal, Library, Memory>;
type PlanStore = StableBTreeMap<Principal, Plan, Memory>;
type SubscriptionStore = StableBTreeMap<Principal, Subscription, Memory>;
type ReadStore = StableBTreeMap<Principal, Read, Memory>;

thread_local! {
    static MEMORY_MANAGER: RefCell<MemoryManager<DefaultMemoryImpl>> =
        RefCell::new(MemoryManager::init(DefaultMemoryImpl::default()));

    pub static USER_STORE: RefCell<UserStore> =
    RefCell::new(StableBTreeMap::init(
        MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(0)))
    ));

    pub static GENRE_STORE: RefCell<GenreStore> =
    RefCell::new(StableBTreeMap::init(
        MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(1)))
    ));
    pub static AUTHOR_STORE: RefCell<AuthorStore> =
    RefCell::new(StableBTreeMap::init(
        MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(2)))
    ));

    pub static BOOK_STORE: RefCell<BookStore> =
    RefCell::new(StableBTreeMap::init(
        MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(3)))
    ));
    pub static LIBRARY_STORE: RefCell<LibraryStore> =
    RefCell::new(StableBTreeMap::init(
        MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(4)))
    ));
    pub static PLAN_STORE: RefCell<PlanStore> =
    RefCell::new(StableBTreeMap::init(
        MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(5)))
    ));
    pub static SUBSCRIPTION_STORE: RefCell<SubscriptionStore> =
    RefCell::new(StableBTreeMap::init(
        MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(6)))
    ));
    pub static READ_STORE: RefCell<ReadStore> =
    RefCell::new(StableBTreeMap::init(
        MEMORY_MANAGER.with(|m| m.borrow().get(MemoryId::new(7)))
    ));
}

#[init]
fn init() {
    ic_cdk::print("!!! Calling init");
    seed();
    ic_cdk::println!("Seeded Called");
}

#[post_upgrade]
fn seed() {
    ic_cdk_timers::set_timer(Duration::ZERO, || {
        spawn(async {
            clear_stores();
            seed_data().await;
        })
    });
}

fn clear_stores() {
    ic_cdk::print("Clearing Author, Genre, and Book stores...");

    AUTHOR_STORE.with(|store| {
        store.borrow_mut().clear_new();
    });
    GENRE_STORE.with(|store| {
        store.borrow_mut().clear_new();
    });
    BOOK_STORE.with(|store| {
        store.borrow_mut().clear_new();
    });

    ic_cdk::println!("Stores cleared successfully!");
}

ic_cdk::export_candid!();
