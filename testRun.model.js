const express = require('express')
const fs = require('fs')

const app = express()

app.use('/files', (req, res) => {
    const resultFirst = () => {
       return new Promise((res, rej) => {
        try {
            const data = fs.readFileSync('./first.txt', {encoding: 'utf-8'})
            res(data)
        } catch (error) {
            rej(error)
        }
       })
    }

    const resultSecond = () => {
        return new Promise((res, rej) => {
        try {
            const data = fs.readFileSync('./second.txt', {encoding: 'utf-8'})
            res(data)
        } catch (error) {
            rej(error)
        }
       })
    }


    Promise.all([resultFirst(), resultSecond()])
        .then((result) => {
           result.forEach((data) => {
            res.send(data)
           })
        })
        .catch((err) => {
            res.status(500).json({success: false, message: err.message})
        })
})

app.listen(5000, () => {
    console.log('server started')
})