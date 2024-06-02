const mongoose = require('mongoose'); //include the mongoose library

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, //ObjectId is a special Type that comes with mongoose Schema Types(Note that Schema Types is used in the model schema and Types is used in the actual route), it is basically a very long unique string that follows some conventions 
    name: String, //assign String type to name
    price: Number, //assign Number type to price
});

module.exports = mongoose.model('Product', productSchema); //first parameter is a string that we can use across our backend for the particular model schema, in this case it's Product