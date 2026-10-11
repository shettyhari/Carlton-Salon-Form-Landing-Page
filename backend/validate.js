"use strict";

// Server-side check of a submitted lead. Mirrors the rules in the frontend form.

const FIELDS = ["name", "phone", "email", "city", "capital_contribution", "timeline", "background"];

const CHOICES = {
  capital_contribution: ["₹1 Cr – ₹1.5 Cr", "₹1.5 Cr – ₹2 Cr", "₹2 Cr+"],
  timeline: ["Immediately", "Within 3 months", "3–6 months", "6+ months"],
  background: [
    "Business owner",
    "Salon / beauty industry",
    "Working professional",
    "Existing franchise Business Partner",
    "Other"
  ]
};

function clean(value, max) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function validateLead(body) {
  const input = body && typeof body === "object" ? body : {};
  const lead = {};
  const errors = [];

  FIELDS.forEach(function (field) {
    lead[field] = clean(input[field], 200);
    if (!lead[field]) errors.push(field + " is required");
  });

  if (lead.phone && !/^[+0-9\s-]{10,15}$/.test(lead.phone)) errors.push("phone is invalid");
  if (lead.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) errors.push("email is invalid");
  Object.keys(CHOICES).forEach(function (field) {
    if (lead[field] && CHOICES[field].indexOf(lead[field]) === -1) errors.push(field + " is not a valid option");
  });

  lead.source = clean(input.source, 100);
  lead.page = clean(input.page, 500);
  lead.created_at = new Date().toISOString();

  return { ok: errors.length === 0, lead: lead, errors: errors };
}

module.exports = { validateLead, FIELDS };
