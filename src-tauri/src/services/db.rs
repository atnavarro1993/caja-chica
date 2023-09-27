use rusqlite::{Connection, named_params, Error as RusqliteError};
use serde::Serialize;
#[derive(Debug, Serialize)]
pub struct FinancialEvent {
    id: u64,
    ammount: f64,
    date: String,
    desc: String
}


#[derive(Debug, thiserror::Error)]
pub enum Error{
    #[error(transparent)]
    Rusqlite(#[from] RusqliteError),
    #[error(transparent)]
    Io(#[from] std::io::Error)
}

impl serde::Serialize for Error {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
        where
            S: serde::Serializer {
        serializer.serialize_str(self.to_string().as_ref())
    }
}

#[tauri::command(rename_all = "snake_case")]
    pub fn add_record(ammount: f64,desc: &str,date: &str) -> Result<String,String>{
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

#[tauri::command(rename_all = "snake_case")]
pub fn get_all_records()-> Result<Vec<FinancialEvent>,Error>{

    let conn = Connection::open("./assets/caja.db").map_err(Error::Rusqlite)?;

    let mut stmt = conn.prepare("select * from financial_events").map_err(Error::Rusqlite)?;

    let rows = stmt.query_map([], |row|{
        Ok(FinancialEvent{ 
            id: row.get(0)?, 
            ammount: row.get(1)?, 
            date: row.get(2)?, 
            desc: row.get(3)? })
    }).map_err(Error::Rusqlite)?;
    
    let res: Result<Vec<_>, _> = rows.collect();
    res.map_err(Error::Rusqlite)
}