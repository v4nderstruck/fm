mod clib;
mod connection;
mod proto;

use clap::Parser;
use clib::Cli;

#[tokio::main]
async fn main() {
    let cli = Cli::parse();
    let mut connection = connection::Connection::new().await.unwrap();

    match cli.exec(&mut connection).await {
        Ok(_) => (),
        Err(e) => {
            eprintln!("{}", e);
            std::process::exit(1);
        }
    }
}
