# Root Cause Analysis (RCA)

Fixing the bug is not enough. You must kill the root cause so it never comes back.

## The "5 Whys" Technique

**Problem**: The user cannot login.

1.  **Why?** The API returns 500.
2.  **Why?** Converting `undefined` to string failed in `AuthService`.
3.  **Why?** The `email` field was missing in the payload.
4.  **Why?** The Frontend form didn't validate the email input.
5.  **Why?** (ROOT CAUSE) We disabled the Submit button validation logic last week during the UI refactor.

**Corrective Action**:
- Fix the bug (re-enable validation).
- Add a test case for empty email submission (prevent regression).

## Defense in Depth
When a bug occurs, ask: **"Why did the system allow this to happen?"**
- Missing Types? (TypeScript)
- Missing Validation? (Zod)
- Missing Constraints? (Database)

**Improve the system, don't just patch the leak.**
