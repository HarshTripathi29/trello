const mongoose = require('mongoose');

const BoardSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true,
    },
    lists : [{
        title : {
            type : String,
            required : true,
        },
        cards : {
            title : {
                type : String,
                required : true,
            },
            description : {
                type : String,
            }
        }
    }]
})

module.exports = mongoose.model('Board', BoardSchema);

