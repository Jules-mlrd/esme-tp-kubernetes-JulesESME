const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
  res.send('Hello ESME DevOps 2025!');
});

app.listen(PORT, () => {
  console.log('Application demarree sur le port ' + PORT);
});
