const movieService = require('../src/services/movieService');
const movieDao = require('../src/dao/movieDao');

beforeEach(() => {
  movieDao._clear();
});

describe('MovieService', () => {
  test('creates and fetches a movie', () => {
    const created = movieService.create({ title: 'Inception', rating: 9, releaseYear: 2010 });
    expect(created.id).toBeDefined();
    const fetched = movieService.getById(created.id);
    expect(fetched.title).toBe('Inception');
    expect(movieService.list()).toHaveLength(1);
  });

  test('updates a movie', () => {
    const created = movieService.create({ title: 'Old', rating: 5 });
    const updated = movieService.update(created.id, { rating: 7, title: 'New' });
    expect(updated.rating).toBe(7);
    expect(updated.title).toBe('New');
  });

  test('deletes a movie', () => {
    const created = movieService.create({ title: 'To be deleted', rating: 4 });
    movieService.delete(created.id);
    expect(() => movieService.getById(created.id)).toThrow('Movie not found');
  });

  test('getById throws 404 for missing movie', () => {
    expect(() => movieService.getById('missing')).toThrow('Movie not found');
  });
});
