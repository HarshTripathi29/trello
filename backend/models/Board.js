const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    labels: [{ text: String, color: String }]
});

const listSchema = new mongoose.Schema({
    title: { type: String, required: true },
    cards: [cardSchema],
});

const BoardSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    cover: { 
        type: String, 
        required: false
    }, // Optional field for cover image
    lists: [listSchema],

})

module.exports = mongoose.model('Board', BoardSchema);

