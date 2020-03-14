require("dotenv").config()

var devUrl = 'mongodb://localhost:27017/surway'
if (process.env.IN_DOCKER) {
    devUrl = 'mongodb://database:27017/surway'
}

module.exports = {
    url: process.env.MONGODB_URI || devUrl
}