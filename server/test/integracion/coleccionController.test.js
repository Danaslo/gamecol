const request = require('supertest');
const app = require('../../app');

describe('Prueba de integración para listarVentas', () => {
  let token;
  beforeAll(async () => {
    const response = await request(app)
      .post('/login')
      .send({ nombreUsuario: 'danielAS', password: 'prueba' });

    token = response.body.token;
  });

  it('Debe devolver una lista de juegos puestos en venta', async () => {
    const response = await request(app)
      .get('/listarEnVenta')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    if (response.body.length > 0) {
      expect(response.body[0]).toHaveProperty('estado', 'No en venta');
    }
  });

  it('Simula un error al obtener ventas', async () => {
    const response = await request(app)
      .get('/listarEnVenta')
    expect(response.status).toBe(403);
    expect(response.body.message).toBe('No se proporcionó un token');
  });
});
