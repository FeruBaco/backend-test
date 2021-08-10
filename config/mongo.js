require('dotenv').config()

// I am using MongoDB Atlas
const mongoose = require('mongoose')

const DB_USER = encodeURIComponent(process.env.DB_USER)
const DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)
const DB_NAME = encodeURIComponent(process.env.DB_NAME)

const MONGO_ATLAS_URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.cjkiw.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`

class MongoDB {
  connect () {
    mongoose.connect(MONGO_ATLAS_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
      .then(() => {
        console.log('Database connected')
      })
      .catch((err) => {
        console.error(err)
      })
  }
}

module.exports = MongoDB
