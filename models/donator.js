const mongoose = require('mongoose')

//donator Schema
const donatorSchema = new mongoose.Schema({
    image: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    name: {
        type: String,
        trim: true,
        min: 1,
        max: 120,
        required: true
    },
    slug: {
        type: String,
        unique: true,
        index: true,
        lowercase: true
    },
    amount: {
        type: Number,
        required: true,
        min: 1,
        max: 99000
    }
},{ timestamps: true })

module.exports = mongoose.model('Donator', donatorSchema)

