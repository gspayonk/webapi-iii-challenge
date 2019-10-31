const dB = require('../data/dbConfig.js');

module.exports = {
  get,
  getById,
  insert,
  update,
  remove,
};

function get() {
  return dB('posts');
}

function getById(id) {
  return dB('posts')
    .where({ id })
    .first();
}

function insert(post) {
  return dB('posts')
    .insert(post)
    .then(allid => {
      return getById(allid [0]);
    });
}

function update(id, changes) {
  return dB('posts')
    .where({ id })
    .update(changes);
}

function remove(id) {
  return dB('posts')
    .where('id', id)
    .del();
}
