import { createServer } from "node:http";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

const envPath = resolve(process.cwd(), ".env");

if (existsSync(envPath)) {
  const envLines = readFileSync(envPath, "utf8").split(/\r?\n/);

  for (const line of envLines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex === -1) continue;

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim();

    if (key && process.env[key] === undefined) {
      process.env[key] = value;
    }
  }
}

const PORT = Number(process.env.PORT || 3001);
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "";
const TELEGRAM_CHAT_IDS = (process.env.TELEGRAM_CHAT_IDS || "")
  .split(",")
  .map((chatId) => chatId.trim())
  .filter(Boolean);

function setJson(res, statusCode) {
  res.writeHead(statusCode, {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json; charset=utf-8",
  });
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let raw = "";

    req.on("data", (chunk) => {
      raw += chunk;
      if (raw.length > 1e6) {
        reject(new Error("Payload too large"));
      }
    });

    req.on("end", () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        reject(new Error("Invalid JSON"));
      }
    });

    req.on("error", reject);
  });
}

function formatMessage(payload) {
  const {
    firstName = "",
    lastName = "",
    group = "",
    topic = "",
    score = 0,
    total = 0,
    timeTaken = "",
  } = payload;

  const percent = total > 0 ? Math.round((score / total) * 100) : 0;
  const grade =
    percent >= 90 ? "A (Ajoyib)"
    : percent >= 75 ? "B (Yaxshi)"
    : percent >= 55 ? "C (Qoniqarli)"
    : "F (Qoniqarsiz)";

  return [
    "Frontend test natijasi",
    "",
    `Ism: ${firstName} ${lastName}`.trim(),
    `Guruh: ${group}`,
    `Bolim: ${topic}`,
    "",
    `Ball: ${score}/${total}`,
    `Foiz: ${percent}%`,
    `Baho: ${grade}`,
    `Vaqt: ${timeTaken}`,
    "",
    `Sana: ${new Date().toLocaleString("uz-UZ")}`,
  ].join("\n");
}

async function sendTelegramMessage(message) {
  if (!TELEGRAM_BOT_TOKEN) {
    throw new Error("TELEGRAM_BOT_TOKEN is missing");
  }

  if (TELEGRAM_CHAT_IDS.length === 0) {
    throw new Error("TELEGRAM_CHAT_IDS is missing");
  }

  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  const responses = await Promise.all(
    TELEGRAM_CHAT_IDS.map(async (chatId) => {
      const telegramRes = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
        }),
      });

      const data = await telegramRes.json();
      if (!telegramRes.ok || !data.ok) {
        throw new Error(data.description || "Telegram request failed");
      }

      return data;
    }),
  );

  return responses;
}

const server = createServer(async (req, res) => {
  if (!req.url) {
    setJson(res, 400);
    res.end(JSON.stringify({ ok: false, error: "Missing URL" }));
    return;
  }

  if (req.method === "OPTIONS") {
    setJson(res, 204);
    res.end();
    return;
  }

  if (req.method === "GET" && req.url === "/api/health") {
    setJson(res, 200);
    res.end(JSON.stringify({ ok: true }));
    return;
  }

  if (req.method === "POST" && req.url === "/api/telegram/result") {
    try {
      const body = await readJsonBody(req);
      const requiredFields = ["firstName", "lastName", "group", "topic", "score", "total", "timeTaken"];
      const missingField = requiredFields.find((field) => body[field] === undefined || body[field] === "");

      if (missingField) {
        setJson(res, 400);
        res.end(JSON.stringify({ ok: false, error: `${missingField} is required` }));
        return;
      }

      await sendTelegramMessage(formatMessage(body));

      setJson(res, 200);
      res.end(JSON.stringify({ ok: true }));
      return;
    } catch (error) {
      setJson(res, 500);
      res.end(
        JSON.stringify({
          ok: false,
          error: error instanceof Error ? error.message : "Unknown server error",
        }),
      );
      return;
    }
  }

  setJson(res, 404);
  res.end(JSON.stringify({ ok: false, error: "Route not found" }));
});

server.listen(PORT, () => {
  console.log(`Telegram result server running on http://localhost:${PORT}`);
});
