use serde::Serialize;

pub mod connection;

#[derive(thiserror::Error, Debug)]
pub enum CommandErr {
    #[error(transparent)]
    ConnectionErr(#[from] anyhow::Error) 
} 

impl Serialize for CommandErr {
    fn serialize<S>(&self, serializer: S) -> Result<S::Ok, S::Error>
    where
        S: serde::Serializer {
        serializer.serialize_str(format!("{:?}", self).as_ref())
    }
}

pub type CommandResult<T, E = CommandErr> = anyhow::Result<T, E>;
