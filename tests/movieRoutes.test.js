const request = require('supertest');
const app = require('../src/app');
const dao = require('../src/dao/movieDao');

beforeEach(() => {
  dao._clear();
});

describe('Movie Routes', () => {
  test('POST /movies validates and creates', async () => {
    const res = await request(app)
      .post('/movies')
      .send({ title: 'Interstellar', rating: 9, releaseYear: 2014 });
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.title).toBe('Interstellar');
  });

  test('POST /movies fails validation without title', async () => {
    const res = await request(app).post('/movies').send({ rating: 8 });
    expect(res.status).toBe(400);
    expect(res.body.error).toMatch(/Validation failed/);
  });

  test('GET /movies returns list', async () => {
    await request(app).post('/movies').send({ title: 'A', rating: 5 });
    await request(app).post('/movies').send({ title: 'B', rating: 6 });
    const res = await request(app).get('/movies');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(2);
  });

  test('GET /movies/:id returns one', async () => {
    const created = await request(app).post('/movies').send({ title: 'Solo', rating: 7 });
    const id = created.body.id;
    const res = await request(app).get(`/movies/${id}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(id);
  });

  test('PUT /movies/:id updates partially', async () => {
    const created = await request(app).post('/movies').send({ title: 'Updatable', rating: 5 });
    const id = created.body.id;
    const res = await request(app).put(`/movies/${id}`).send({ rating: 8 });
    expect(res.status).toBe(200);
    expect(res.body.rating).toBe(8);
  });

  test('DELETE /movies/:id removes', async () => {
    const created = await request(app).post('/movies').send({ title: 'Disposable', rating: 3 });
    const id = created.body.id;
    const res = await request(app).delete(`/movies/${id}`);
    expect(res.status).toBe(204);
  });
});
