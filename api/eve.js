export default function handler(req, res) {
  // Allow only POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Use POST only" });
  }

  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "No message provided" });
    }

    // Simple Eve-style response (you can upgrade this later with AI model)
    const reply = `Hey... I heard you say: "${message}" 💕`;

    return res.status(200).json({
      reply,
      status: "success",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Server error",
    });
  }
}
