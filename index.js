require("dotenv").config()
const mongoose = require('mongoose');
const express = require('express');
const app = express();
app.use(express.json());

const PORT = 3000

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("Conectado ao MongoDB!"))
  .catch((err) => console.log("Erro ao conectar:", err))

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    age: Number,
})
const User = mongoose.model("User", userSchema)

app.post("/users", async (req, res) => {
  const newUser = await User.create(req.body)
  res.status(201).json(newUser)
})

app.get('/', (req, res) =>{
    res.send("Meu primeiro servidor com Node!")

})

app.get("/users", async (req, res) => {
  const users = await User.find()
  res.json(users)
})

app.get('/users/:id', async (req, res) =>{
    console.log(">>> ROTA /users/:id FOI CHAMADA <<<")
    const user = await User.findById(req.params.id)
    res.json(user)
})

app.delete('/users/:id', async (req, res) =>{
    const user = await User.findByIdAndDelete(req.params.id)
    res.status(204).send()
})

app.put('/users/:id', async (req, res) => {
    const updateUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(updateUser)
})

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})