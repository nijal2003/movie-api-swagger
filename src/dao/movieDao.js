class InMemoryMovieDao {
  constructor() {
    this.movies = new Map();
  }

  findAll() {
    return Array.from(this.movies.values());
  }

  findById(id) {
    return this.movies.get(id) || null;
  }

  create(movie) {
    this.movies.set(movie.id, movie);
    return movie;
  }

  update(id, partial) {
    const existing = this.findById(id);
    if (!existing) return null;
    const updated = { ...existing, ...partial, id };
    this.movies.set(id, updated);
    return updated;
  }

  remove(id) {
    return this.movies.delete(id);
  }

  // For tests
  _clear() {
    this.movies.clear();
  }
}

module.exports = new InMemoryMovieDao();
