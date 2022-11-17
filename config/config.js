require("dotenv").config();

module.exports = {
    NODE_ENV:process.env.NODE_ENV || "development",
    MONGO_DATABASE_DEV:process.env.MONGO_DATABASE_DEV || 'mongodb://localhost:27017/salvatara',
    AWS_ACCESS_KEY:process.env.AWS_ACCESS_KEY,
    AWS_SECRET_KEY:process.env.AWS_SECRET_KEY
}