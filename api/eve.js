export default function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Use POST only" });
    }

    const body = req.body || {};
    const message = body.message || "No message received";

    return res.status(200).json({
      reply: `Eve heard: "${message}" 💕`,
      status: "success"
    });

  } catch (error) {
    return res.status(500).json({
      error: "Server crashed",
      details: error.message
    });
  }
}
