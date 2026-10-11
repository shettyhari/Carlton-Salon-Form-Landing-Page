"use strict";

// Carlton franchise lead form: serves the frontend and receives lead submissions.
//   npm start  ->  http://localhost:3000

const path = require("path");
const express = require("express");
const { validateLead } = require("./validate");
const { saveLead } = require("./leads");

const PORT = process.env.PORT || 3000;
// In this repo the frontend sits next to backend/; in release/ too, so the same relative path works.
const FRONTEND_DIR = process.env.FRONTEND_DIR || path.join(__dirname, "..", "frontend");

const app = express();
app.use(express.json({ limit: "20kb" }));

// Replaces frontend/config.js: the page is served from here, so it posts to /api/leads on the same origin.
app.get("/config.js", function (req, res) {
  const config = { formEndpoint: "/api/leads", metaPixelId: process.env.META_PIXEL_ID || "" };
  res.type("application/javascript").send("window.CARLTON_CONFIG = " + JSON.stringify(config) + ";\n");
});

app.post("/api/leads", async function (req, res) {
  const result = validateLead(req.body);
  if (!result.ok) {
    return res.status(400).json({ ok: false, errors: result.errors });
  }
  try {
    await saveLead(result.lead);
    res.status(201).json({ ok: true });
  } catch (err) {
    console.error("Failed to save lead:", err);
    res.status(500).json({ ok: false, error: "Could not save lead" });
  }
});

app.get("/api/health", function (req, res) {
  res.json({ ok: true });
});

app.use(express.static(FRONTEND_DIR));

app.listen(PORT, function () {
  console.log("Carlton lead form running on http://localhost:" + PORT);
});
