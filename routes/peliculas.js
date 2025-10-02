const express = require('express');
const router = express.Router();
const Pelicula = require('../models/Pelicula');

// 📌 Obtener todas las películas
router.get('/', async (req, res) => {
  try {
    const peliculas = await Pelicula.find();
    // Agregar el promedio de calificación a cada película
    const peliculasConPromedio = peliculas.map(p => ({
      ...p.toJSON(),
      calificacion: p.calificacionPromedio
    }));
    res.json(peliculasConPromedio);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

// 📌 Subir película
router.post('/', async (req, res) => {
  try {
    let { titulo, descripcion, calificacion, imagen } = req.body;

    // Validación de campos
    if (!titulo || !descripcion || !calificacion) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    // 🔥 Convertir calificación a número
    calificacion = typeof calificacion === 'string' ? Number(calificacion) : calificacion;
    if (isNaN(calificacion) || calificacion < 1 || calificacion > 5) {
      return res.status(400).json({ error: 'La calificación debe ser un número válido entre 1 y 5' });
    }

    // Crear nueva película
    const nuevaPelicula = new Pelicula({
      titulo,
      descripcion,
      calificaciones: [calificacion], // Usar el array de calificaciones
      imagen
    });

    await nuevaPelicula.save();
    
    // Retornar la película con el promedio calculado
    const peliculaConPromedio = {
      ...nuevaPelicula.toJSON(),
      calificacion: nuevaPelicula.calificacionPromedio
    };
    
    res.json({ msg: 'Película subida con éxito ✅', pelicula: peliculaConPromedio });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

module.exports = router;




