import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import candidateRouter from './src/presentation/routes/candidate/candidateRouter'

const app = express()

dotenv.config()
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
const port = process.env.PORT || 5000

app.use('/', candidateRouter)

app.listen(port, () => {
    console.log(`Server started running on port ${port}`)
})
