const mongoose = require("mongoose");

url="mongodb+srv://dilzaibme:abcd1234@softhouze.4neeez7.mongodb.net/homeHub?appName=softhouze"
const connectDB = () => {
    console.log("we are in database")
    return mongoose.connect(url, {
        useNewUrlParser : true,
        useUnifiedTopology : true,
    });
}

module.exports = connectDB

