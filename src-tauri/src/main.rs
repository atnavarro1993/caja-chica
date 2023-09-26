// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use rusqlite::Connection;


// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command(rename_all = "snake_case")]
fn greet(name: &str,last_name: &str,age: &str) -> String {
    format!("tu nombre es {}, y tu apellido {}. Tenes {} años", name,last_name,age)
}

fn main() {
    let _conn = Connection::open("./assets/caja.db");
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
