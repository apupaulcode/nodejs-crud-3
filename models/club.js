const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ClubSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    players:{
        type:String,
        required:true
    },
    coach:{
        type:String,
        required:true
    }
})

const Club = mongoose.model('club',ClubSchema)

module.exports = Club;