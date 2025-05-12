const request = require('supertest');
const app = require('../../app');

describe('Pruebas funcionales y no funcionales sobre listarEnVenta', () => {
  let token;

  beforeAll(async () => {
    const response = await request(app)
      .post('/login')
      .send({ nombreUsuario: 'danielAS', password: 'prueba' });

    token = response.body.token;
  });

  //Prueba funcional:
  it('Debe denegar el acceso sin token (403)', async () => {
    const response = await request(app).get('/listarEnVenta');
    expect(response.status).toBe(403);
    expect(response.body.message).toBe('No se proporcionó un token');
  });

  //Prueba no funcional(rendimiento)
  it('Debe responder en menos de 500ms', async () => {
    const start = Date.now();
    const response = await request(app)
      .get('/listarEnVenta')
      .set('Authorization', `Bearer ${token}`);
    const duration = Date.now() - start;

    expect(response.status).toBe(200);
    expect(duration).toBeLessThan(500);
  });

    //Prueba no funcional(rendimiento)
    it('Debe responder en menos de 100ms', async () => {
      const start = Date.now();
      const response = await request(app)
        .get('/listarEnVenta')
        .set('Authorization', `Bearer ${token}`);
      const duration = Date.now() - start;
  
      expect(response.status).toBe(200);
      expect(duration).toBeLessThan(100);
    });



});