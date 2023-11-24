use rusqlite::{Connection, named_params};
use serde::Serialize;
use crate::common::common::{Error, open_db};
#[derive(Debug, Serialize)]
pub struct FinancialEvent {
    id: u64,
    amount: f64,
    date: String,
    desc: String,
    event_type_id: u64
}


#[tauri::command]
    pub fn add_record(ammount: f64,desc: &str,date: &str, event_type: u64) -> Result<String,String>{
        let conn = Connection::open("./assets/caja.db");
        let res = {
            let _conn = conn.unwrap();
            _conn.execute(
                "insert into financial_events (amount,date,desc,event_type_id) values (:ammount,:date,:desc,:event_type);",
                named_params! {
                ":ammount": ammount,
                ":date": date,
                ":desc": desc,
                ":event_type": event_type
            })
        };
        match res {
            Ok(_) => Ok("registro agregado".to_string()),
            Err(_e) => Err(format!("Hubo un error: {}", _e).into()),
        }
    }

#[tauri::command(rename_all = "snake_case")]
pub fn get_all_records()-> Result<Vec<FinancialEvent>,Error>{

    let conn = open_db()?;

    let mut stmt = conn
    .prepare("select * from financial_events order by date")
    .map_err(Error::Rusqlite)?;

    let rows = stmt.query_map([], |row|{
        Ok(FinancialEvent{ 
            id: row.get(0)?, 
            amount: row.get(1)?, 
            date: row.get(2)?, 
            desc: row.get(3)?,
            event_type_id:row.get(4)? 
        })
    }).map_err(Error::Rusqlite)?;
    
    let res: Result<Vec<FinancialEvent>, _> = rows.collect();
    res.map_err(Error::Rusqlite)
}