// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]


mod services;
mod db_utils;
mod common;



use common::common::open_db;

use services::{db, event_types};
use std::fs;
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command(rename_all = "snake_case")]
fn greet(name: &str,last_name: &str,age: &str) -> String {
    format!("tu nombre es {}, y tu apellido {}. Tenes {} años", name,last_name,age)
}

fn main() {
    match fs::create_dir("assets"){
        Ok(_) => (),
        Err(_) => (),
    }
    let _ = {
        let _conn = open_db();
        db_utils::init_db(&_conn.unwrap());
    };
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            greet,
            db::add_record,
            db::get_all_records,
            event_types::get_all_event_types])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");

}
