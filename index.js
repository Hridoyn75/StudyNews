import express from 'express'
import { CallJugantorCampus } from './jugantor/campus.js'
import db from './db.js';
import { CallJugantorSports } from './jugantor/sports.js';
import cron from 'node-cron';



const app = express();

app.get('/', (req, res) => {
    res.json("Server is live!")
})

app.get('/posts', (req, res) => {
    const q = 'SELECT * FROM posts ORDER BY timestamp';

    db.query(q, (err, data) => {
        if (err) return res.status(500).json("Sorry, there was an error")
        res.json(data)
    })
})




app.get('/script', (req, res) => {
    
    CallJugantorCampus();
    CallJugantorSports();
    res.send("Script activated!")
})




app.listen(5000, ()=>{
    console.log('Server is running on port 5000');
})



  


