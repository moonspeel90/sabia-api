const express = require("express");
const Parser = require("rss-parser");
const cors = require("cors");

const app = express();
const parser = new Parser();

app.use(cors());

app.get("/conteudos", async (req, res) => {
  try {
    const feed = await parser.parseURL("https://apprendendo.blog/feed");
    const posts = feed.items.map(item => ({
      titulo: item.title,
      link: item.link,
      resumo: item.contentSnippet,
      data: item.pubDate
    }));
    res.json(posts);
  } catch (error) {
    console.error("Erro ao ler o feed RSS:", error);
    res.status(500).json({ erro: "Não foi possível acessar o feed." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API sabIA rodando em http://localhost:${PORT}`);
});
