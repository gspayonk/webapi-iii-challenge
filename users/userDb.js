const dB = require('../data/dbConfig.js');

module.exports = {
  get,
  getById,
  getUserPosts,
  insert,
  update,
  remove,
};

function get() {

  return dB('users');
}

function getById(id) {

  return dB('users')
    .where({ id })
    .first();
}

function getUserPosts(userId) {

  return dB('posts as p')

    .join('users as u', 'u.id', 'p.user_id')

    .select('p.id', 'p.text', 'u.name as postedBy')

    .where('p.user_id', userId);
}

function insert(user) {

  return dB('users')

    .insert(user)

    .then(allid => {
      return getById(allid[0]);
    });
}

function update(id, changes) {

  return dB('users')

    .where({ id })

    .update(changes);
}

function remove(id) {

  return dB('users')

    .where('id', id)
    
    .del();
}
