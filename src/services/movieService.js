const { v4: uuidv4 } = require('uuid');
const movieDao = require('../dao/movieDao');

class MovieService {
  list() {
    return movieDao.findAll();
  }

  getById(id) {
    const movie = movieDao.findById(id);
    if (!movie) {
      const err = new Error('Movie not found');
      err.status = 404;
      throw err;
    }
    return movie;
  }

  create(data) {
    const id = uuidv4();
    const movie = { id, ...data };
    return movieDao.create(movie);
  }

  update(id, data) {
    const updated = movieDao.update(id, data);
    if (!updated) {
      const err = new Error('Movie not found');
      err.status = 404;
      throw err;
    }
    return updated;
  }

  delete(id) {
    const ok = movieDao.remove(id);
    if (!ok) {
      const err = new Error('Movie not found');
      err.status = 404;
      throw err;
    }
  }
}

module.exports = new MovieService();
