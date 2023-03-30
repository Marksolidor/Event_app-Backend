require('dotenv').config();
 
 const app = require('./app');
 
 const startDatabase = require('./src/database/startDatabase');
 
 startDatabase();
 
 app.listen(process.env.PORT, () => {
   console.log('El servidor está en ejecución en el puerto 3000');
 });