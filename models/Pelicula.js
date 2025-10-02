const mongoose = require('mongoose');

const peliculaSchema = new mongoose.Schema({
  titulo: String,
  descripcion: String,
  imagen: String, // ruta de la imagen subida
  calificaciones: [Number]
});

peliculaSchema.virtual('calificacionPromedio').get(function() {
  if (!this.calificaciones || this.calificaciones.length === 0) return 0;
  const sum = this.calificaciones.reduce((a, b) => a + b, 0);
  return Math.round((sum / this.calificaciones.length) * 10) / 10; // Redondear a 1 decimal
});

// Asegurar que los virtuals se incluyan al convertir a JSON
peliculaSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Pelicula', peliculaSchema);
