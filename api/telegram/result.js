function json(res, statusCode, payload) {
  res.status(statusCode).json(payload);
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
    "FRONTEND TEST NATIJASI",
    "",
    `Ism: ${firstName} ${lastName}`.trim(),
    `Guruh: ${group}`,
    `Bo'lim: ${topic}`,
    "",
    `Ball: ${score}/${total}`,
    `Foiz: ${percent}%`,
    `Baho: ${grade}`,
    `Vaqt: ${timeTaken}`,
    "",
    `Sana: ${new Date().toLocaleString("uz-UZ")}`,
  ].join("\n");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    json(res, 405, { ok: false, error: "Method not allowed" });
    return;
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatIds = (process.env.TELEGRAM_CHAT_IDS || "")
    .split(",")
    .map((chatId) => chatId.trim())
    .filter(Boolean);

  if (!token || chatIds.length === 0) {
    json(res, 500, { ok: false, error: "Telegram env variables are missing" });
    return;
  }

  const requiredFields = ["firstName", "lastName", "group", "topic", "score", "total", "timeTaken"];
  const missingField = requiredFields.find((field) => req.body?.[field] === undefined || req.body?.[field] === "");

  if (missingField) {
    json(res, 400, { ok: false, error: `${missingField} is required` });
    return;
  }

  try {
    const url = `https://api.telegram.org/bot${token}/sendMessage`;
    const text = formatMessage(req.body);
    const results = await Promise.all(
      chatIds.map(async (chatId) => {
        const telegramRes = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: chatId, text }),
        });
        const data = await telegramRes.json();

        if (!telegramRes.ok || !data.ok) {
          throw new Error(data.description || "Telegram request failed");
        }

        return data;
      })
    );

    json(res, 200, { ok: true, sent: results.length });
  } catch (error) {
    json(res, 500, {
      ok: false,
      error: error instanceof Error ? error.message : "Unknown Telegram error",
    });
  }
}
