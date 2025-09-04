const movieService = require('../services/movieService');

class MovieController {
  async list(req, res, next) {
    try {
      const movies = await movieService.list();
      res.json(movies);
    } catch (err) { next(err); }
  }

  async get(req, res, next) {
    try {
      const movie = await movieService.getById(req.params.id);
      res.json(movie);
    } catch (err) { next(err); }
  }

  async create(req, res, next) {
    try {
      const created = await movieService.create(req.validated);
      res.status(201).json(created);
    } catch (err) { next(err); }
  }

  async update(req, res, next) {
    try {
      const updated = await movieService.update(req.params.id, req.validated);
      res.json(updated);
    } catch (err) { next(err); }
  }

  async remove(req, res, next) {
    try {
      await movieService.delete(req.params.id);
      res.status(204).send();
    } catch (err) { next(err); }
  }
}

module.exports = new MovieController();
