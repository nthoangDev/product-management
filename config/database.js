const mongoose = require('mongoose');

module.exports.connect = async () => {
    try {
        // process.env.MONGO_URL: Cú pháp để sử dụng biến ở file .env 
        mongoose.connect(process.env.MONGO_URL);
        console.log("Connnect Success!");
    } catch (error) {
        console.log("Connect Fail!")
    }
}

