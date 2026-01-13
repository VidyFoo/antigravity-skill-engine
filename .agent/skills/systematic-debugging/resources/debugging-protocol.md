# The Debugging Protocol

Follow these steps exactly. Do not skip.

## Step 1: Reproduction (The Golden Rule)
**Goal**: Make it fail consistently.
1. Isolate the environment (Localhost? Staging?).
2. Find the minimal steps to crash.
3. Write a failing test case (TDD Style). **Do not touch implementation code until you have a failing test.**

## Step 2: Localization (Binary Search)
**Goal**: Find *where* it breaks.
1. **Divide and Conquer**: If the process has 10 steps, check the state at Step 5.
   - If Step 5 is bad, the bug is in 1-5.
   - If Step 5 is good, the bug is in 6-10.
2. **Trace Backwards**: Start from the error (e.g., the null pointer) and work backwards up the stack trace.

## Step 3: Understanding (The "Why")
**Goal**: Understand *why* it breaks.
1. **Read the error message**. Seriously. Read it twice.
2. **Check assumptions**. "I assumed `getUsers()` always returns an array." -> Verify it.
3. **Rubber Duck**: Explain the logic out loud.

## Step 4: The Fix
**Goal**: Correct the logic.
1. Apply the smallest possible change.
2. Avoid "Refactoring while Debugging". Fix first, refactor later.

## Step 5: Verification
**Goal**: Prove it's fixed.
1. Run the failing test case. It should pass (`Green`).
2. Run the full suite. Ensure no regressions.
