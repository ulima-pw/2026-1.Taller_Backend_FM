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

  { id: 2, name: "Alisson Becker", age: 33, nat: "BRA", position: "Arquero", height: 193, weight: 91, pac: 8,  tec: 12, dri: 8,  fin: 5,  pas: 13 },

  { id: 3, name: "Virgil van Dijk", age: 34, nat: "NED", position: "Defensa", height: 195, weight: 92, pac: 14, tec: 14, dri: 12, fin: 10, pas: 15 },

  { id: 4, name: "Kevin De Bruyne", age: 35, nat: "BEL", position: "Mediocampista", height: 181, weight: 75, pac: 15, tec: 19, dri: 18, fin: 17, pas: 20 },

  { id: 5, name: "Kylian Mbappé", age: 27, nat: "FRA", position: "Delantero", height: 178, weight: 73, pac: 20, tec: 18, dri: 20, fin: 19, pas: 16 },

  { id: 6, name: "Erling Haaland", age: 26, nat: "NOR", position: "Delantero", height: 194, weight: 88, pac: 18, tec: 16, dri: 15, fin: 20, pas: 13 }
]
let nextId = 7;

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
    const object = req.body;
    
    if (object) {
        const player = {...object, id: nextId++ }
        jugadores.push(player)
        return resp.status(200).json(player);
    } else {
        return resp.status(500).json({error: "No se ha podido crear al jugador."});
    }
    
})

// PUT /api/players
app.put("/api/players/:id", (req, resp) => {
        const object = req.body;
        const id = req.params.id;
        const index = jugadores.findIndex(x => id == x.id);

        if (index > -1 && object) {
            jugadores[index] = object;
            return resp.status(200).json(object);
        } else {
            return resp.status(500).json({ error: "No se ha podido modificar al jugador."})
        }
})

// DELETE /api/players
app.delete("/api/players/:id", (req, resp) => {
    const id = req.params.id;
    const index = jugadores.findIndex(x => id == x.id);

    if (index > -1) {
        jugadores.splice(index,1);
        return resp.status(200).json({ message: "Registro de jugador eliminado."})
    } else {
        return resp.status(500).json({error: "No se encontró al jugador."})
    }
})

app.listen(PORT, () => {
    console.log("Servidor iniciado")
})