import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
import router from './config/router.js'

const app = express()

const startServer = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.dbURI)
    console.log('🤝 Database successfully connected!')

    // MIDDLEWARE
    app.use(express.json())
    
    // Router
    app.use('/api',router)

    // Log every request
    app.use((req, _res, next) => {
      console.log(`🚨 Request received: ${req.method} - ${req.url}`)
      next()
    })
    
    // Catcher
    app.use((_req, res) => {
      return res.status(404).json({ message: 'Not found!' })
    })

    // Start listening for requests
    app.listen(process.env.port, () => {
      console.log(`🚀 Server up and running on port ${process.env.port}`)
    })
  } catch (err) {
    console.log('🆘 Something went wrong - couldnt connect')
    console.log(err)
  }
}

startServer()