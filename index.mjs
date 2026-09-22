#!/usr/bin/env node
// Find a marketplace listing and rent the seller's device into a live session.
// Usage: COMMANDAGI_API_KEY=cagi_… node index.mjs [listingId]
//   With no listingId, picks the first online robot/computer/sim rental listing.

const API = process.env.COMMANDAGI_API_URL ?? "https://api.commandagi.com";
const KEY = process.env.COMMANDAGI_API_KEY;
if (!KEY) throw new Error("Set COMMANDAGI_API_KEY (https://commandagi.com/api-keys)");

async function api(path, { method = "GET", body } = {}) {
  const res = await fetch(`${API}${path}`, {
    method,
    headers: { authorization: `Bearer ${KEY}`, "content-type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`${method} ${path} → ${res.status}: ${text}`);
  return text ? JSON.parse(text) : {};
}

// 1. Find a listing to rent.
let listingId = process.argv[2];
if (!listingId) {
  const rentable = ["robot_rental", "compute_rental", "sim_access"];
  const found = [];
  for (const kind of rentable) {
    const { listings } = await api(`/listings?kind=${kind}`);
    found.push(...listings);
  }
  if (!found.length) throw new Error("No rental listings found. Try `host-a-robot` to create one.");
  listingId = found[0].id;
  console.log(`Renting "${found[0].title}" (${listingId})`);
}

// 2. Create a session to rent the device into.
const { sessionId } = await api("/sessions", { method: "POST", body: { title: "Rented session" } });

// 3. Rent. This takes a pay-in-advance purchase, attaches the seller's device, and signals their
//    runtime to join — billed per minute at the listing's rate (no double-charge on the prepaid block).
try {
  const r = await api(`/sessions/${sessionId}/rent-device`, { method: "POST", body: { listingId } });
  console.log(`rented: device ${r.deviceId} @ ${r.creditsPerMinute} credits/min`);
  console.log(`\nDrive it live: https://commandagi.com/session/${sessionId}`);
} catch (e) {
  // device_offline / insufficient_credits / listing_at_capacity are the common cases.
  console.error(String(e).replace(/^Error: /, ""));
  process.exit(1);
}
