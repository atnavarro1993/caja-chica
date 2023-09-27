// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use rusqlite::Connection;
pub mod db_utils;
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command(rename_all = "snake_case")]
fn greet(name: &str,last_name: &str,age: &str) -> String {
    format!("tu nombre es {}, y tu apellido {}. Tenes {} años", name,last_name,age)
}

fn main() {
    let _ = {
       let _conn = Connection::open("./assets/caja.db");
        db_utils::db::init_db(&_conn.unwrap());
    };
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet,db_utils::db::add_record])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
