# Database

Not connected yet. Our developer will add the database and connect it in `backend/leads.js` (`saveLead`).

Each lead the form submits has these fields:

| Field                  | Example                         | Notes                         |
|------------------------|---------------------------------|-------------------------------|
| `name`                 | Test User                       | required                      |
| `phone`                | +91 98765 43210                 | required, 10–15 digits/+/-    |
| `email`                | test@example.com                | required                      |
| `city`                 | Hyderabad, Telangana            | required                      |
| `capital_contribution` | ₹1 Cr – ₹1.5 Cr                 | one of the form options       |
| `timeline`             | Within 3 months                 | one of the form options       |
| `background`           | Business owner                  | one of the form options       |
| `source`               | Carlton franchise Meta ad form  | set by the page               |
| `page`                 | https://…/?utm_source=facebook  | full page URL, incl. UTM tags |
| `created_at`           | 2026-10-11T10:30:00.000Z        | set by the backend            |
