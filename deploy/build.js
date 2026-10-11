"use strict";

// Builds the upload-ready copies:  npm run build
//   release/frontend  ->  static files for any web host (Vercel, Netlify, cPanel, S3...)
//   release/backend   ->  Node server; run "npm install --omit=dev && npm start" inside it

const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const release = path.join(root, "release");
const pkg = require(path.join(root, "package.json"));

fs.rmSync(release, { recursive: true, force: true });

fs.cpSync(path.join(root, "frontend"), path.join(release, "frontend"), { recursive: true });
fs.cpSync(path.join(root, "backend"), path.join(release, "backend"), { recursive: true });

// The backend serves ../frontend, which in release/ is release/frontend. Give it its own package.json.
fs.writeFileSync(
  path.join(release, "backend", "package.json"),
  JSON.stringify(
    {
      name: pkg.name + "-backend",
      version: pkg.version,
      private: true,
      main: "server.js",
      scripts: { start: "node server.js" },
      engines: pkg.engines,
      dependencies: pkg.dependencies
    },
    null,
    2
  ) + "\n"
);

console.log("Built release/frontend and release/backend");
