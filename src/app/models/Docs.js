const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Docs = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        image: { type: String },
        videoId: { type: String, required: true },
        level: { type: String },
    },
    {
        timestamps: true,
    },
);

module.exports = mongoose.model('Docs', Docs);
