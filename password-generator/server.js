const express = require('express');
const path = require('path');
const { exec } = require('child_process');
const app = express();
const port = 3000;

// Serve arquivos estáticos da pasta "public"
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/generate-password', (req, res) => {
  const length = req.query.length || 8;
  const includeUppercase = req.query.uppercase === 'true';
  const includeNumbers = req.query.numbers === 'true';
  const includeSpecial = req.query.special === 'true';

  const command = `python3 generate_password.py ${length} ${includeUppercase} ${includeNumbers} ${includeSpecial}`;
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).send('Error generating password');
    }
    res.send(stdout.trim());
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
