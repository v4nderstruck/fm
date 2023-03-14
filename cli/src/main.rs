mod clib;
use clap::Parser;
use clib::Cli;

fn main() {
    let cli = Cli::parse();
    match cli.exec() {
        Ok(_) => (),
        Err(e) => {
            eprintln!("{}", e);
            std::process::exit(1);
        }
    }
}
