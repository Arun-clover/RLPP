const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const pfdb = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Database is connected: ${pfdb.connection.name}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};
module.exports = connectDB;
