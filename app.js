const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const port = 8081;

// Configuração do body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configuração do banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Substitua pelo seu usuário do MySQL
    password: 'cimatec', // Substitua pela sua senha do MySQL
    database: 'mercado', // Nome do seu banco de dados
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Conectado ao banco de dados MySQL!');
});

// Servir o arquivo HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota para inserir dados
app.post('/submit', (req, res) => {
    const { nomeProduto, preco, quantidade } = req.body;
    const total = quantidade * Number(preco)
    const query = 'INSERT INTO Produtos (nomeProduto, preco, quantidade, total) VALUES (?, ?, ?, ?)';
    db.query(query, [nomeProduto, preco, quantidade, total], (err, result) => {
        if (err) {
            throw err;
        }
        res.json({ message: 'Dados inseridos com sucesso!' });
    });
});

// Rota para buscar dados
app.get('/getData', (req, res) => {
    const query = 'SELECT * FROM Produtos';
    db.query(query, (err, results) => {
        if (err) {
            throw err;
        }
        res.json(results);
    });
});

// Rota para atualizar dados
app.put('/update/:id', (req, res) => {
    const { id } = req.params;
    const { nomeProduto, preco, quantidade } = req.body;
    const total = quantidade * preco
    const query = 'UPDATE Produtos SET nomeProduto = ?, preco = ?, quantidade = ?, total = ? WHERE id = ?';
    db.query(query, [nomeProduto, preco, quantidade, total, id], (err, result) => {
        if (err) {
            throw err;
        }
        res.json({ message: 'Dados atualizados com sucesso!' });
    });
});

// Rota para deletar dados
app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM Produtos WHERE id = ?';
    db.query(query, [id], (err, result) => {
        if (err) {
            throw err;
        }
        res.json({ message: 'Dados deletados com sucesso!' });
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
