
use rusqlite::Connection;

pub fn init_db(conn: &Connection ){
    let _ = conn.execute("create table if not exists financial_events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ammount REAL NOT NULL,
        date DATE,
        desc TEXT)", []);
}

