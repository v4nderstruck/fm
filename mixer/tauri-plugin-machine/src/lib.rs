use tauri::{plugin::{Builder, TauriPlugin}, Runtime, Manager};

mod service;
mod machine;

/// Initializes the plugin.
pub fn init<R: Runtime>() -> TauriPlugin<R> {
  Builder::new("machine")
        .setup(|app_handle| {
            app_handle.manage(machine::MixerMachine::init());
            Ok(())
        })  
        .build()
}
