const request = require('supertest');
const app = require('../../server');
 // importar la aplicación express
const pool = require('../database/db');

describe('Comentarios API', () => {
  beforeAll(async () => {
    // crear una tabla temporal para pruebas
    await pool.query(`
      CREATE TEMPORARY TABLE comentarios (
        id SERIAL PRIMARY KEY,
        id_usuario INTEGER NOT NULL,
        id_evento INTEGER NOT NULL,
        comentario TEXT NOT NULL
      );
    `);
  });

  afterAll(async () => {
    // eliminar la tabla temporal
    await pool.query('DROP TABLE comentarios;');
    pool.end();
  });

  it('debería agregar un comentario a un evento', async () => {
    const id_usuario = 1;
    const id_evento = 2;
    const comentario = 'Comentario de prueba';
    const token = 'token-de-prueba';

    // enviar una solicitud POST con datos de prueba
    const res = await request(app)
      .post('/comments')
      .set('Authorization', `Bearer ${token}`)
      .send({ id_usuario, id_evento, comentario });

    // verificar que se ha agregado el comentario correctamente
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id_usuario', id_usuario);
    expect(res.body).toHaveProperty('id_evento', id_evento);
    expect(res.body).toHaveProperty('comentario', comentario);
  });

  it('debería eliminar un comentario de un evento', async () => {
    const id = 1;
    const token = 'token-de-prueba';

    // enviar una solicitud DELETE con datos de prueba
    const res = await request(app)
      .delete(`/comments/${id}`)
      .set('Authorization', `Bearer ${token}`);

    // verificar que se ha eliminado el comentario correctamente
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', id);
  });
});