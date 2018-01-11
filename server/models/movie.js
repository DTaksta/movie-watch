var mongoose = require('mongoose'),
    findOrCreate = require('mongoose-findorcreate'),
    Schema = mongoose.Schema;

var movieSchema = new Schema({
    id: { type: String, required: true },
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true, unique: true },
    genres: { type: String, required: true },
    posterUrl: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});
movieSchema.plugin(findOrCreate);

var Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;