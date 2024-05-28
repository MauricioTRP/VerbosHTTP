const { Pool } = require('pg'); 

const config = { 
  user: process.env.USERDB, 
  host: process.env.HOST, 
  database: process.env.DATABASE, 
  password: process.env.PASSWORD, 
  port: process.env.PORT, 
} 

const pool = new Pool(config);

const insertar = async (payload) => {
  /**
   * Insertar "payload" en la tabla ejercicios
   * nombre, series, repeticiones, descanso
   */
  const text = "INSERT INTO ejercicios (nombre, series, repeticiones, descanso) VALUES ($1, $2, $3, $4) RETURNING *";
  const values = [payload.nombre, payload.series, payload.repeticiones, payload.descanso]
  const queryObject = {
    text: text,
    values: values
  }

  const result = await pool.query(queryObject)
  return result
}

const consultar = async () => {

  const text = "SELECT * FROM ejercicios";
  const result = await pool.query(text)

  return result
}

const actualizar = async (payload) => {

  // Actualizar un registro
  const text = 'UPDATE ejercicios SET series =$2, repeticiones =$3, descanso = $4 WHERE nombre=$1'
  const values = [payload.nombre, payload.series, payload.repeticiones, payload.descanso]

  const queryObject = {
    text: text,
    values: values
  }

  const result = await pool.query(queryObject)

  return result
}

const eliminar = async (queryString) => {
  // Eliminar un registro
  const text = 'DELETE FROM ejercicios WHERE nombre = $1'
  const values = [queryString.nombre]

  const queryObject = {
    text: text,
    values: values
  }

  const result = await pool.query(queryObject)
  return result
}

module.exports = { insertar, consultar, actualizar, eliminar };
