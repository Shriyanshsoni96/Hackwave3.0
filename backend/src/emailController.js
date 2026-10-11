
const fs = require("fs");
const path = require("path");

const DATASET_PATH = path.join(
  __dirname,
  "../../revops_agent_email_dataset.csv"
);

function parseCSVLine(line) {
  const values = [];
  let value = "";
  let insideQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      if (insideQuotes && line[i + 1] === '"') {
        value += '"';
        i++;
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === "," && !insideQuotes) {
      values.push(value);
      value = "";
    } else {
      value += char;
    }
  }

  values.push(value);
  return values;
}

function loadEmails() {
  const content = fs.readFileSync(DATASET_PATH, "utf8")
    .replace(/^\uFEFF/, "");

  const lines = content.split(/\r?\n/).filter(Boolean);
  const headers = parseCSVLine(lines[0]);

  return lines.slice(1).map((line) => {
    const values = parseCSVLine(line);
    return Object.fromEntries(
      headers.map((header, index) => [header, values[index] ?? ""])
    );
  });
}

exports.getEmails = (req, res) => {
  try {
    const emails = loadEmails();
    const risk = String(req.query.risk || "").toLowerCase();

    const filtered = risk
      ? emails.filter(
          (email) => email.churn_risk.toLowerCase() === risk
        )
      : emails;

    res.json({
      success: true,
      total: filtered.length,
      emails: filtered,
    });
  } catch (error) {
    console.error("Email dataset error:", error.message);
    res.status(500).json({
      success: false,
      message: "Could not load email dataset",
    });
  }
};
