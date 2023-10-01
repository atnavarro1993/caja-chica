
use rusqlite::{Connection, named_params};

fn init_event_types(conn: & Connection){
    let count: i32 = conn.query_row(
        &format!("SELECT COUNT(*) FROM event_type"),
        [],
        |row| row.get(0),
    ).unwrap();
    if count == 0{
        let _ = conn.execute("insert into event_type (type) values(:event_type)", named_params! {":event_type": "ingreso"});
        let _ = conn.execute("insert into event_type (type) values(:event_type)", named_params! {":event_type": "egreso"});
    }
}



pub fn init_db(conn: &Connection ){
    let _ = conn.execute("create table if not exists event_type
    (
        id   INTEGER
            primary key autoincrement,
        type TEXT not null
    );
    ", []);
    init_event_types(conn);
    let _ = conn.execute("
    create table if not exists financial_events
    (
        id            INTEGER
            primary key autoincrement,
        amount        REAL not null,
        date          DATE not null,
        desc          TEXT not null,
        event_type_id integer not null
            constraint financial_events_event_type_id_fk
                references event_type
    );
    )", []);
}

