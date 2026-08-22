# WORKFLOW.md

## Methodology

1) Explore
I reviewed the branch difference and repo state:
- round1-vague vs round2-precise
- the form implementation in SettingsForm.tsx
- the behavior tests in SettingsForm.test.tsx

2) Plan
The aim was to improve the form from a simple input collector into a validated,
accessible settings form. The plan was:
- add validation rules for username, email, and password
- support required edge cases like mismatch and invalid format
- connect labels to fields for accessibility
- add error messaging and status feedback
- write tests before claiming it works

3) Code
The implementation in SettingsForm.tsx does this:
- validates user input
- blocks invalid submission
- shows field-specific errors
- uses htmlFor, aria-invalid, and aria-live
- returns a payload only when valid

4) Tests
The test file SettingsForm.test.tsx covers:
- short username
- invalid email
- conflicting passwords
- valid save payload

5) Verify
I ran the test suite with:
npm run test

Result:
✓ src/SettingsForm.test.tsx (4 tests)
  ✓ shows an error and blocks save when username is too short
  ✓ shows an error and blocks save when email format is invalid
  ✓ shows an error and blocks save when passwords do not match
  ✓ calls onSave with the correct payload when all input is valid
Test Files  1 passed (1)
     Tests  4 passed (4)

Bottom line: this is the practical equivalent of plan mode for this repo —
inspect, plan, implement, test, and verify. Round two satisfies the intent of
the prompt (file references, constraints, example behavior, and a
write-then-test-then-run verification step) even though it was executed via a
chat-based AI session rather than Claude Code's plan mode, which would show an
explicit, approvable plan as a separate step before any code is generated.

## Correctness

Round one (`round1-vague`) collected form data with no validation at all —
empty fields, malformed emails, and weak passwords were all silently accepted,
and the data was only logged to the console. Round two (`round2-precise`)
validates every field with explicit rules: username must be 3–30 characters
using only letters, numbers, underscores, or hyphens; email must match a basic
valid-format pattern; and when a new password is entered, it must be at least
8 characters and include an uppercase letter, lowercase letter, digit, and
special character, with the confirm-password field required to match exactly.
These rules live in a single `validate()` function rather than being scattered
across the component, and are confirmed by four automated tests covering short
usernames, invalid email formats, mismatched passwords, and the valid-save
path where `onSave` is called with the correct payload.

## Accessibility

Round one relied on placeholder text inside each input, with no `<label>`
elements — a common but flawed pattern, since placeholders disappear once a
user starts typing and aren't reliably announced by screen readers. Round two
gives every field a real `<label>` connected via `htmlFor`/`id`, so the
association is permanent and accessible. Error messages are tied to their
input through `aria-describedby` and marked with `role="alert"` so they're
announced immediately, invalid fields are flagged with `aria-invalid`, and an
`aria-live="polite"` region announces an overall save-status summary. These
changes matter for keyboard and screen-reader users specifically, but they
also make the form's state clearer for every user.

## Edge Cases

Round two explicitly handles cases round one ignored entirely: empty required
fields, invalid email formats, passwords that don't meet strength
requirements, mismatched password/confirm pairs, display names exceeding the
50-character limit, and the case where a user leaves the (optional) password
fields blank entirely — which correctly skips password validation rather than
treating blank as an error.

## Review Effort

Round one's single-file, un-validated form was trivial to read but told a
reviewer almost nothing about intended behavior — there was no way to know if
missing validation was a bug or a deliberate choice. Round two is larger, but
easier to actually review: the validation logic is isolated in one function,
the four tests double as executable documentation of expected behavior, and a
reviewer can run `npm run test` and get a pass/fail signal in seconds rather
than manually re-testing every field by hand. The extra size is offset by the
confidence the tests provide.