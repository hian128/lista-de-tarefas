const express = require ('express')
const app = express()
app.use(express.json())

const pool = require("./db");


/* rotas */

/* listar tarefas */
app.get('/tarefas' , async (req,res) => {
    const result = await pool.query("SELECT * FROM tarefas");
    res.json(result.rows);
    
})

/* criar tarefa */
app.post('/tarefas', async (req,res) => {
    const {nome_tarefa} = req.body;
    const result = await pool.query("INSERT INTO tarefas (nome_tarefa) VALUES ($1) RETURNING *",[nome_tarefa]);
    res.json(result.rows[0]);
})

/* atualizar tarefa */
app.patch('/tarefas/:id' , async (req,res) => {
    const {id} = req.params;
    const {nome_tarefa} = req.body;
    
    const result = await pool.query("UPDATE tarefas SET nome_tarefa = $1 WHERE id = $2 RETURNING *" , [nome_tarefa , id]);
    res.json(result.rows[0]);
})

app.delete('/tarefas/:id' ,async (req,res)=> {
    const {id} = req.params;
    await pool.query("DELETE FROM tarefas WHERE id = $1",[id]);
    res.json("tarefa excluida");
})



app.listen(3000)