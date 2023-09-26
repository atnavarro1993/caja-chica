pub mod db{

    use rusqlite::{Connection, named_params};

    pub fn init_db(conn: &Connection ){
        let _ = conn.execute("create table if not exists financial_events (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            ammount REAL NOT NULL,
            date DATE,
            desc TEXT)", []);
    }

    #[tauri::command(rename_all = "snake_case")]
    pub fn add_record(ammount: i64,desc: &str,date: &str) -> Result<String,String>{
        print!("{}",&ammount);
        let conn = Connection::open("./assets/caja.db");
        let res = {
            let _conn = conn.unwrap();
            _conn.execute(
                "insert into financial_events (ammount,date,desc) values (:ammount,:date,:desc);",
                 named_params! {
                ":ammount": ammount,
                ":date": date,
                ":desc": desc,
            })
        };

        match res {
            Ok(_) => Ok("registro agregado".to_string()),
            Err(_e) => Err(format!("Hubo un error: {}", _e).into()),
        }

    }
}