import express from 'express'
import path from 'path'
import { exec } from 'child_process'
import { error } from 'console'
import { stdout } from 'process'
import { fileURLToPath } from 'url';
import cors from 'cors'
const app = express();
const port = 3000;  
import LimpaBloqueio from './controllers/LimpaBloqueioControllers.js';


// Obtenha o nome do arquivo atual e seu diretório
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors())
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

app.get('/calculadora_instalacao', (req, res) =>{
  const command = 'python3 calculadora_instalacao.py';
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return res.status(500).send('Error getting value');
    }
    res.send(stdout.trim())
  })
})

app.get('/limpabloqueio/address/:address', LimpaBloqueio.unblockAddress)
app.get('/limpabloqueio/lista', LimpaBloqueio.getBlockedList)
app.get('/limpabloqueio/status/:address', LimpaBloqueio.getBlockedByAddress)

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
