"use strict";

// Lead storage. No database is connected yet: leads are only printed to the server log.
//
// TODO (developer): connect the database here. saveLead() receives a validated lead object:
//   { name, phone, email, city, capital_contribution, timeline, background, source, page, created_at }
// See database/README.md for the field list. Throw an error if saving fails; the API then
// returns 500 and the form shows "Something went wrong" so the visitor can retry.

async function saveLead(lead) {
  console.log("New lead (not stored, no database connected):", JSON.stringify(lead));
}

module.exports = { saveLead };
