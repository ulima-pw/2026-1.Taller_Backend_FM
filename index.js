import express from "express"
import bodyParser from "body-parser"
import { PrismaClient } from "./generated/prisma/index.js"
import { Pool } from "pg"
import { PrismaPg } from "@prisma/adapter-pg"
import 'dotenv/config'

const app = express()
const PORT = 5000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

const jugadores = [
    { id: 1, name: "Emiliano Martínez", age: 31, nat: "ARG", position: "Arquero", height: 195, weight: 87, pac: 9, tec: 11, dri: 7, fin: 6, pas: 12 },

    { id: 2, name: "Alisson Becker", age: 33, nat: "BRA", position: "Arquero", height: 193, weight: 91, pac: 8, tec: 12, dri: 8, fin: 5, pas: 13 },

    { id: 3, name: "Virgil van Dijk", age: 34, nat: "NED", position: "Defensa", height: 195, weight: 92, pac: 14, tec: 14, dri: 12, fin: 10, pas: 15 },

    { id: 4, name: "Kevin De Bruyne", age: 35, nat: "BEL", position: "Mediocampista", height: 181, weight: 75, pac: 15, tec: 19, dri: 18, fin: 17, pas: 20 },

    { id: 5, name: "Kylian Mbappé", age: 27, nat: "FRA", position: "Delantero", height: 178, weight: 73, pac: 20, tec: 18, dri: 20, fin: 19, pas: 16 },

    { id: 6, name: "Erling Haaland", age: 26, nat: "NOR", position: "Delantero", height: 194, weight: 88, pac: 18, tec: 16, dri: 15, fin: 20, pas: 13 }
]
let nextId = 7;





console.log("DB_URL", process.env["DATABASE_URL"])


const pool = new Pool({
    connectionString: process.env["DATABASE_URL"]
})
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

// GET /api/players
app.get("/api/players", async (req, resp) => {
    const players = await prisma.player.findMany({
        where : {
            active : true
        },
        include : {
            attributes : true,
            nat : true,
            positions : true
        }
    })
    resp.json(players)
})

// GET /api/players/:id
app.get("/api/players/:id", async (req, resp) => {
    const id = req.params.id
    if (id == null) {
        resp.status(400).json({
            error: "No ha enviado id de jugador"
        })
        return
    }

    const player =  await prisma.player.findUnique({
        where : {
            id : parseInt(id)
        },
        include : {
            attributes : true,
            nat : true,
            positions : true
        }
    })

    if (player == null) {
        resp.status(400).json({
            error: "No se encuentra un jugador con ese id"
        })
        return
    }

    resp.json(player)
})

// POST /api/players
app.post("/api/players", async (req, resp) => {
    const object = req.body;

    if (object) {
        try {
            const player = await prisma.player.create({
                data : {
                    name : object.name,
                    age : object.age,
                    nationalityId: object.nationalityId,
                    height : object.height,
                    weight : object.weight,
                    club : object.club ,
                    positions : {
                        connect : object.positions
                    }
                }
            })
            await prisma.playerAttributes.create({
                data : {
                    pac : object.pac,
                    tec : object.tec,
                    dri : object.dri,
                    fin : object.fin,
                    pas : object.pas,
                    playerId : player.id
                }
            })
            resp.json(player)
        }catch(e){
            return resp.status(400).json({
                error : e.message
            })
        }
        
    } else {
        return resp.status(500).json({ error: "No se ha podido crear al jugador." });
    }

})

// PUT /api/players
app.put("/api/players/:id", async (req, resp) => {
    const object = req.body;
    const id = req.params.id;

    if (object) {
        try {
            console.log(object)
            const player = await prisma.player.update({
                where : {
                    id : parseInt(id)
                }, data : {
                    name : object.name,
                    age : object.age,
                    nationalityId : object.nationalityId,
                    height : object.height,
                    weight : object.weight,
                    positions : {
                        set : object.positions
                    }
                }
            })


            await prisma.playerAttributes.update({
                where : {
                    playerId : parseInt(id)
                }, data : {
                    pac : object.pac,
                    tec : object.tec,
                    dri : object.dri,
                    fin : object.fin,
                    pas : object.pas
                }
            })
            return resp.status(200).json(player)
        }catch(e){


            return resp.status(400).json({
                error : e.message
            })
        }
    } else {
        return resp.status(500).json({ error: "No se ha podido crear al jugador." });
    }
})

// DELETE /api/players
app.delete("/api/players/:id", async (req, resp) => {
    const id = req.params.id;

    try {
        await prisma.playerAttributes.delete({
            where : {
                playerId : parseInt(id)
            }
        })
        await prisma.player.delete({
            where : {
                id : parseInt(id)
            }
        })
        
        return resp.json({
            msg : "OK"
        })
    }catch (e) {
        return resp.status(400).json({
            error : e.message
        })
    }
})

app.listen(PORT, () => {
    console.log("Servidor iniciado")
})