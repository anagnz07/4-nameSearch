/**
 * Exponer una API REST con un endpoint para buscar palabras. 
 * 
 * Si la palabra que nos piden, existe, devuelve un 200 OK, y si no
 * existe devuelve un 404 - Not Found. Es obligatorio que introduzcan
 * algún texto de, al menos, 3 caracteres (error 400 si no se cumple)
 * 
 * Si la palabra está contenida en otra, devuelve una lista, con 
 * todas ellas (ca -> ['cat',...])
 * 
 * Los datos de palabras se sacan del fichero british-english
 * 
 * El puerto es parametrizable por línea de comandos:
 * 
 *   node index.js -p 4444 
 * 
 * 
 * 1) npm init
 * 2) endpoint REST con datos ficticios
 * 3) leer el fichero real
 * 4) puerto parametrizable
 * 
 */
 const express = require('express')
 const fs = require('fs').promises
 const path = require('path');

 const app = express()
 

 app.get('/search',async (req, res) => {

    const { text } = req.query

     // leer parámetros de la petición (req.query.text)
    if (!text) {
        res.sendStatus(400)
        return
    }

    if (text.length < 3) {
        res.sendStatus(400)
        return
    }

    const FILENAME = path.join(__dirname, 'british-english');

    const data = await fs.readFile(FILENAME, 'utf8')

    const lengthIsNotZero = word => word.length !== 0
    const matchWord = word => word.toLowerCase().includes(text.toLowerCase())

    const words = data
        .split('\n')
        .filter( lengthIsNotZero )
        .filter( matchWord )

     // filtrar las palabras del fichero según el texto que nos pasan
     res.send(words)  
 })

 app.listen(4000)
