use rusqlite::{Error as RusqliteError, Connection};

#[derive(Debug, thiserror::Error)]
pub enum Error {
    #[error(transparent)]
    Rusqlite(#[from] RusqliteError),
    #[error(transparent)]
    Io(#[from] std::io::Error),
}

impl serde::Serialize for Error {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer,
    {
        serializer.serialize_str(self.to_string().as_ref())
    }
}



pub fn open_db() -> Result<Connection, Error> {
    Connection::open("./assets/caja.db").map_err(Error::Rusqlite)
}
