const express = require('express');
const app = express();
app.use(express.json());

const PORT = 3000

let users = [
    { id: 1, name: "Victor", email: "victor@email.com"},
    { id: 2, name: "Yasmin", email: "yasmin@email.com"},
    { id: 3, name: "Gabriella", email: "gabriella@email.com"},
    { id: 4, name: "Lucilene", email: "lucilene@email.com"},
    { id: 5, name: "Marilene", email: "marilene@email.com"},
]

app.post('/users', (req, res) =>{
    const newUser = req.body
    users.push(newUser)
    res.status(201).json(newUser)
})

app.get('/', (req, res) =>{
    res.send("Meu primeiro servidor com Node!")

})

app.get('/users/:id', (req, res) =>{
    const id = req.params.id
    const user = users.find((u) => u.id === Number(id))
    res.json(user)
})

app.delete('/users/:id', (req, res) =>{
    const id = Number(req.params.id)
    users = users.filter((u) => u.id !== id)
    res.status(204).send()
})

app.put('/users/:id', (req, res) =>{
    const id = Number(req.params.id)
    const updatedUser = req.body
    users = users.map((u) => (u.id === id ? {...u, ...updatedUser} : u))
    res.json(updatedUser)
})

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})