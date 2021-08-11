require('dotenv').config()

const express = require('express')
const notFound = require('./middleware/notFound')
const IndexRouter = require('./routes/index.routes')
const UserRouter = require('./routes/user.routes')
const AdminRouter = require('./routes/admin.routes')
const MongoDB = require('./config/mongo')

const app = express()
const mongoDB = new MongoDB()
mongoDB.connect()

// Middlewares
app.use(express.json())

// Routes
app.use('/v1', IndexRouter)
app.use('/v1/user', UserRouter)
app.use('/v1/admin', AdminRouter)

app.use(notFound)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
