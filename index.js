const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

const idades = [];

app.post('/adicionar-idade', (req, res) => {
    const novaIdade = parseInt(req.body.idade);
    if (!isNaN(novaIdade)) {
        idades.push(novaIdade);
        const quantidadeIdades = idades.length;
        const somaIdades = idades.reduce((total, idade) => total + idade, 0);
        const maiorIdade = Math.max(...idades);
        
        const resultados = {
            quantidadeIdades,
            somaIdades,
            maiorIdade
        };

        res.json(resultados);
    } else {
        res.status(400).send('Por favor, insira uma idade válida.');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
