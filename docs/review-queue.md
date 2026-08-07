---
title: Review Queue
created: 2026-08-07
---

# Review Queue

Things that need a human's judgement. **Nothing here is a gate.**

`scripts/verify.sh` checks what is machine-decidable — does this link resolve,
does this file exist, does this parse. Whether a page reads well, whether a note
split preserved its meaning, whether a site looks right: those are judgement
calls, and turning a judgement call into a boolean just launders a probability
into a green tick.

So they come here instead, and get resolved in conversation.

## Format

```
- [ ] <what to look at> — <why it needs a person> (task N)
```

## Open

_Nothing yet — the migration has not started. Items get added as tasks land._

Expected additions, per the plan:

- Both note splits from `notes.md` (task 6) — where one note's meaning ends and
  the next begins is a reading decision.
- The temperature chart (task 8) — Flowershow renders it server-side, so whether
  it actually draws cannot be checked locally.
- Overall coherence of the flattened knowledge base (task 13) — the checker can
  prove every link resolves, not that the structure makes sense.
- Both sites' appearance under the `lessflowery` theme (task 13).
- Whether the 2021-era prose in the notes and on the home page still stands, or
  needs a dated caveat. Several passages make claims about "as of 2021".

## Resolved

_None yet._
