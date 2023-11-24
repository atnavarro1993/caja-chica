use serde::Serialize;
use crate::common::common::{Error, open_db}; 


#[derive(Debug, Serialize)]
pub struct EventType {
    id: u64,
    event_type: String,
}



#[tauri::command]
pub fn get_all_event_types() -> Result<Vec<EventType>, Error> {
    
    let conn = open_db()?;

    let mut stmt = conn
    .prepare("select * from event_type")
    .map_err(Error::Rusqlite)?;

    let rows = stmt
    .query_map([], |row|{
        Ok(EventType{
            id:row.get(0)?,
            event_type:row.get(1)?
        })
    })
    .map_err(Error::Rusqlite)?;
    
    let res: Result<Vec<EventType>,_> = rows.collect();
    res.map_err(Error::Rusqlite)
}
