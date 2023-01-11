// import { connect } from 'mongoose'
const { connect } = require('mongoose')
// import dotenv from 'dotenv'
// dotenv.config()

const connectDB = async () => {
  try {
    await connect('mongodb+srv://radulito19:newpassword@cluster0.hhvnbh6.mongodb.net/test')
      .then(db => console.log('Database is connected'))
      .catch(err => console.log(err))

  } catch (error) {
    console.log(error)
  }

}

connectDB()