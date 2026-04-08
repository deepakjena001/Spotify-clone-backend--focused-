const mongoose = require('mongoose');



const musicSchema = new mongoose.Schema({
    uri:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    artist:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",                            // this is the name of collection for the reference we have given
        required: true
    }
})


const musicModel = mongoose.model("music", musicSchema)


module.exports = musicModel;