# rent-and-drive

Rent a seller's robot, computer, or simulation into a session and drive it live.

```bash
export COMMANDAGI_API_KEY=cagi_…
node index.mjs                 # rent the first online rental listing
node index.mjs <listingId>     # rent a specific listing
```

The seller's embodiment must be `online` (their standby runtime connected — see
[`host-a-robot`](../host-a-robot)). Renting meters per minute at the listing's rate; the seller's
earnings are escrowed until your session ends, then released. Docs:
https://commandagi.com/docs/rent
