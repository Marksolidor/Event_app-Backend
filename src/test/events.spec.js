const request = require('supertest');

const app = require('../../app');

const Evento = require('../models/eventsModels');

describe('Prueba integración para eventos', () => {
  it('debe devolver un evento en particular', async () => {
    const eventoMock = { nombre_evento: 'Evento 1' };
    Evento.getEventoById = jest.fn().mockResolvedValue(eventoMock);

    const res = await request(app).get('/events/123');

    expect(res.status).toBe(200);
    expect(res.body).toEqual(eventoMock);
  });

  it('debe devolver un mensaje de error si el evento no existe', async () => {
    Evento.getEventoById = jest.fn().mockResolvedValue(null);

    const res = await request(app).get('/events/123');

    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: 'Evento no encontrado' });
  });
});
