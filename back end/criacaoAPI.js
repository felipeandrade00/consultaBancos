
const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')
const app = express();

const port = 3000;

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'fElipe120803',
    database: 'bancosrevgas'
});

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conexão bem-sucedida ao banco de dados MySQL');
});

app.use(cors())

app.get("/listagemBancos", (req, res) => {
    connection.query("SELECT codigoCompensacao, nomeInstituicao FROM tabelaBancos", (error, resultado) => {
        if (error){
            console.error(`deu erro: ${error}`)
            res.status(500).send("erro ao consultar o banco de dados")
            return;
        }
        res.json(resultado)
        
    } )
})

app.get("/listagemBancos/:codigoCompensacao", (req, res) => {
    const codigoCompensacao = req.params.codigoCompensacao;
    connection.query(`SELECT * FROM tabelaBancos WHERE codigoCompensacao = ${codigoCompensacao}`, (error, resultado) => {
        if(error){
            console.error("deu erro: ", error)
            res.status(500).send("erro ao consultar banco de dados")
            return
        }
        if(resultado.length === 0){
            res.status(404).send("não encontrado")
            return
        }
        res.json(resultado)
        
    })
})

app.listen(port, () => {
    console.log(`servidor iniciado na porta ${port}`)
})

