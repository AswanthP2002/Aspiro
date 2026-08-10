import express from 'express'

const app = express()

app.use('/api/v1/users/:id', (req: Reque))
app.listen(5000, () => console.log('started'))

// app.use('/api/v1/users/:id/fetch?isActive=true')