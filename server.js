import http from "http";
import fs from "fs";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const server = http.createServer((req, res) => {

  if (req.method === "POST" && req.url === "/api/eve") {
    let body = "";

    req.on("data", chunk => {
      body += chunk;
    });

    req.on("end", async () => {
      try {
        const { message, userId } = JSON.parse(body);

        const completion = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: `You are EVE, a personal AI assistant for ${userId}.` },
            { role: "user", content: message }
          ]
        });

        const reply = completion.choices[0].message.content;

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ reply }));

      } catch (err) {
        console.error(err);
        res.writeHead(500, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ reply: "Something went wrong..." }));
      }
    });

    return;
  }

  if (req.url === "/") {
    const html = fs.readFileSync("public/index.html");
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(html);
    return;
  }

  if (req.url === "/app.js") {
    const js = fs.readFileSync("public/app.js");
    res.writeHead(200, { "Content-Type": "application/javascript" });
    res.end(js);
    return;
  }

  res.writeHead(404);
  res.end();
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, "0.0.0.0", () => {
  console.log("EVE running on port " + PORT);
});
