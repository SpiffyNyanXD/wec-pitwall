The problem was that the Cookie Preferences page was crashing due to a missing null check or loading state before the `Termly` iframe initialized.

We resolved it by:
1. Adding a `termlyReady` state and an effect hook to check for `window.displayPreferenceModal` and the actual iframe.
2. We wait up to 5 seconds for Termly to load before showing a safe skeleton box loading UI.
3. We display the current consent status defensively (`consent || 'Unknown'`).

All tests and lints pass, no new problems found. Please provide code review feedback if anything needs improving.
