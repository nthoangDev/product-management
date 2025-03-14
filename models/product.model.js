const mongoose = require("mongoose")

const productSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        price: Number,
        discountPercentage: Number,
        rating: Number,
        stock: Number,
        thumbnail: String,
        status: String,
        position: Number,
        deleted: Boolean
    }
);

const Product = mongoose.model('Product', productSchema);
// Đối số đầu tiên (Product) là tên riêng của collection trong database. Mặc định nó sẽ tìm tới collection có tên viết thường, số nhiều đối số này (products)

module.exports = Product;