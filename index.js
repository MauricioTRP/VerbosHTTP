const express = require('express')
const app = express()
const { insertar, consultar, actualizar, eliminar } = require('./db')

app.listen(3000, () => {
  console.log("App escuchando puerto 3000")
})

// Middleware
app.use(express.json())

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html")
})

app.post("/ejercicios", async (req, res) => {
  // Obtenemos información del formulario
  const payload = req.body

  try {
    const response = await insertar(payload)
  
    res.send(response.rows)
  } catch (error) {
    // Definimos código de estado
    res.statusCode = 500
    res.json({error: 'Algo salió mal, intentalo más tarde'})
  }
})

app.get("/ejercicios", async (req, res) => {
  try {
    const response = await consultar()

    res.send(response)
  } catch (error) {
    res.statusCode = 500
    res.json({error: "Algo salió mal"})
  }
})

app.put("/ejercicios", async (req, res) => {
  const payload = req.body

  try {
    const response = await actualizar(payload)
    res.json(response.rows)
  } catch (error) {
    console.log(error)
    res.statusCode = 500
    res.json({error: 'Algo salió mal'})
  }
})

app.delete("/ejercicios", async (req, res) => {
  const queryString = req.query

  try {
    const result = await eliminar(queryString)
  
    res.statusCode = 202
    res.json({message: 'Registro Eliminado'})
  } catch (error) {
    res.statusCode = 500
    res.json({error: 'Algo salió mal'})
  }
})