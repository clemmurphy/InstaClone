import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
import router from './config/router.js'
import path from 'path-posix'

const app = express()
const port = process.env.port || 4000

const startServer = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.dbURI)
    console.log('🤝 Database successfully connected!')

    // MIDDLEWARE
    app.use(express.json())
    
    // Router
    app.use('/api', router)

    // Log every request
    app.use((req, _res, next) => {
      console.log(`🚨 Request received: ${req.method} - ${req.url}`)
      next()
    })

    // server static assets if in production
    if (process.env.NODE_ENV === 'production'){    
      app.use(express.static('client/build'))  // set static folder 
      //returning frontend for any route other than api 
      app.get('*',(_req, res)=>{     
        res.sendFile(path.resolve(__dirname,'client','build', 'index.html' ))    
      })
    }
    
    // Catcher
    app.use((_req, res) => {
      return res.status(404).json({ message: 'Not found!' })
    })

    // Start listening for requests
    app.listen(port, '0.0.0.0', () => {
      console.log(`🚀 Server up and running on port ${port}`)
    })
  } catch (err) {
    console.log('🆘 Something went wrong - couldnt connect')
    console.log(err)
  }
}

startServer()