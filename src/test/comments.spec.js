const request = require('supertest');

const app = require('../../app');

const Evento = require('../models/eventsModels');
const User = require('../models/usersModel');
const Comment = require('../models/commentsModel');

describe('Prueba integración para comentarios', () => {
  it('Crear comentario exitosamente', async () => {
    const eventoMock = { id: 1, nombre_evento: 'Evento 1' };
    const userMock = { id: 1, nombre: 'Nombre usuario' };
    const commentMock = {
      id_usuario: userMock.id,
      id_evento: eventoMock.id,
      comentario: 'Este es un comentario de prueba',
    };

    Evento.getEventoById = jest.fn().mockResolvedValue(eventoMock);
    User.getUsuarioById = jest.fn().mockResolvedValue(userMock);
    Comment.crearComentario = jest.fn().mockResolvedValue(commentMock);

    const payload = {
      id_usuario: userMock.id,
      id_evento: eventoMock.id,
      comentario: commentMock.comentario,
    };

    const res = await request(app).post('/comments').send(payload);

    expect(res.status).toBe(201);
    expect(res.body).toStrictEqual(payload);
  });

  it('Eliminar comentario exitosamente', async () => {
    const eventoMock = { id: 1, nombre_evento: 'Evento 1' };
    const userMock = { id: 1, nombre: 'Nombre usuario' };
    const commentMock = {
      id_usuario: userMock.id,
      id_evento: eventoMock.id,
      comentario: 'Este es un comentario de prueba',
    };

    Comment.eliminarComentario = jest.fn().mockResolvedValue(commentMock);

    const res = await request(app).delete('/comments/1').send();
    expect(res.status).toBe(200);
  });
});
