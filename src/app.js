import express from 'express'

import productRoutes from './routes/inventario.route.js'


const app = express()


// Middleware

app.use(express.json())

// ROUTERS


app.use('/api', productRoutes)

app.use((req, res, next) => {
  res.status(404).json({
    message: 'No se encontro nada bro'
  })
})

export default app
