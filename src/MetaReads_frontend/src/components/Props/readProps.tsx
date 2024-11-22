import { Principal } from "@dfinity/principal";

export interface Read {
    id: Principal,
    book_id: Principal,
    user_id: Principal,
    page_history: number,
    total_read_duration: number,
}