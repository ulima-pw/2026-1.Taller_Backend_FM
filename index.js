import express from "express"
import bodyParser from "body-parser"

const app = express()
const PORT = 5000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended : true
}))

const jugadores = [
    { id: 1, name: "Emiliano Martínez", age: 31, nat: "ARG", position: "Arquero", height: 195, weight: 87, pac: 9,  tec: 11, dri: 7,  fin: 6,  pas: 12 },
]
let nextId = 2;

// GET /api/players
app.get("/api/players", (req, resp) => {
    resp.json(jugadores)
})

// GET /api/players/:id
app.get("/api/players/:id", (req, resp) => {
    const id = req.params.id
    if (id == null) {
        resp.status(400).json({
            error : "No ha enviado id de jugador"
        })
        return
    }

    for (let j of jugadores) {
        if (String(j.id) === id) {
            resp.json(j)
            return
        }
    }

    resp.status(400).json({
        error : "Jugador no encontrado"
    })
})

// POST /api/players
app.post("/api/players", (req, resp) => {

})

// PUT /api/players
app.put("/api/players/:id", (req, resp) => {

})

// DELETE /api/players
app.delete("/api/players/:id", (req, resp) => {

})

app.listen(PORT, () => {
    console.log("Servidor iniciado")
})