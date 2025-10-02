const { Schema, model } = require('mongoose');

const comentarioSchema = new Schema({
  texto: { type: String, required: true },
  calificacion: { type: Number, min: 1, max: 5 },
  usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
  pelicula: { type: Schema.Types.ObjectId, ref: 'Pelicula', required: true },
  fecha: { type: Date, default: Date.now }
});

module.exports = model('Comentario', comentarioSchema);