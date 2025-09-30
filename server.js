// server.js
const express = require('express');
const fetch = require('node-fetch'); // npm install node-fetch@2
const cors = require('cors');

const app = express();
const PORT = 3000;

// Permetti richieste dal tuo sito
app.use(cors());

const BASEROW_TOKEN = "sbTNA8wi08niUWXICFt1VL5vbAruIn9t";
const TABLE_ID = "685753";

app.get('/eventi', async (req, res) => {
  const url = `https://api.baserow.io/api/database/rows/table/${TABLE_ID}/?user_field_names=true`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${BASEROW_TOKEN}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      return res.status(response.status).send(await response.text());
    }

    const data = await response.json();
    res.json(data.results); // restituisce solo l'array di righe
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server proxy in ascolto su http://localhost:${PORT}`);
});
