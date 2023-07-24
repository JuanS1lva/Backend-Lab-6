const express = require('express')
const mongoose = require('mongoose')

// Importa las rutas
import doctorRoutes from '../routes/doctorRoutes';
import patientRoutes from '../routes/patientRoutes';
import appointmentRoutes from '../routes/appointmentRoutes';

const app = express();
const PORT = 3000;

// Configura la conexión a la base de datos MongoDB
const MONGODB_URI = 'mongodb://127.0.0.1:27017/hospital';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Conexión exitosa a la base de datos MongoDB');
    app.listen(PORT, () => {
      console.log(`Servidor Express en ejecución en el puerto ${PORT}`);
    });
  })
  .catch((error:any) => {
    console.error('Error al conectar a la base de datos MongoDB', error);
  });

// Middleware para el manejo de datos en formato JSON
app.use(express.json());

// Rutas
app.use('/api', doctorRoutes);
app.use('/api', patientRoutes);
app.use('/api', appointmentRoutes);

