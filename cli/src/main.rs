mod lib;
use clap::Parser;
use lib::Cli;

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
