use tauri::{plugin::{Builder, TauriPlugin}, Runtime, Manager};

use crate::service::connection::{connection_status, connect_to};

mod service;
mod machine;

/// Initializes the plugin.
pub fn init<R: Runtime>() -> TauriPlugin<R> {
  Builder::new("mixer_machine")
        .setup(|app_handle| {
            app_handle.manage(machine::MixerMachine::init());
            Ok(())
        })  
        .invoke_handler(tauri::generate_handler![connection_status, connect_to])
        .build()
}
