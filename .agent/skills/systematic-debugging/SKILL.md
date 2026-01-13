---
name: systematic-debugging
description: A scientific protocol for finding and fixing bugs. Prevents "guess-driven development". Use when encountering errors, bugs, crashes, or "it doesn't work".
---

# Systematic Debugging

## Purpose
To stop "thrashing" (randomly changing code hoping it fixes the bug). We use the Scientific Method: Observe -> Hypothesize -> Experiment -> Conclusion.

## When to Use This Skill
- **Compiler/Runtime Errors**: "TypeError: undefined is not a function".
- **Logic Bugs**: "The total calculation is wrong".
- **Visual Bugs**: "The modal doesn't open".
- **Performance Regressions**: "It suddenly got slow".

## The Protocol (R-H-B-F-R)

1.  **R - Reproduce**: Create a minimal reproduction case. If you can't reproduce it, you can't fix it.
2.  **H - Hypothesize**: "I think the `user` object is null here."
3.  **B - Binary Search/Verify**: Divide the problem space. Log at the halfway point. Is it broken before or after?
4.  **F - Fix**: Apply the fix logic.
5.  **R - Regression Test**: Verify the fix AND ensure nothing else broke.

---

## 🛠️ The "Rubber Duck" Method
When you are stuck, you must explain the code line-by-line to the user (or the virtual duck).
*"Here, I initialize the array. Then I loop. Wait, I'm looping over the wrong variable."*

**The Agent MUST explicitly switch to "Rubber Duck Mode" when confused.**

---

## Resource Files

| Topic | File |
| :--- | :--- |
| **Debugging Protocol** | [debugging-protocol.md](resources/debugging-protocol.md) (Step-by-step guide) |
| **Root Cause Analysis** | [root-cause-analysis.md](resources/root-cause-analysis.md) (5 Whys) |
