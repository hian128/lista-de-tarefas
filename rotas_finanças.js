const express = require('express')
const app = express()
app.use(express.json())

const pool = require("./db");
const cors = require("cors");
app.use(cors());


/* rota para devolver descriçao das finanças */

app.get('/financas', async (req, res) => {
    const result = await pool.query("SELECT * FROM financas ORDER BY data_do_valor DESC");
    res.json(result.rows);

})


app.post('/financas', async (req, res) => {
    const { descricao,data_do_valor,valor,tipo} = req.body
    const result = await pool.query("INSERT INTO financas (descricao,data_do_valor,valor,tipo) VALUES ($1,$2,$3,$4) RETURNING *",[descricao, data_do_valor, valor, tipo]);
    res.status(201).json(result.rows[0]);


});













app.listen(3000)