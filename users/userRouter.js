// const express = 'express';
const postsDb = require('../posts/postDb');
const userDb = require('./userDb');

const router = require('express').Router();

router.post('/', validateUser, (req, res) => {
    const {name} = req.body;

    userDb.insert({name}).then(user => res.status(200).json(user));

});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {

    const blogPost = {
        text: req.body.text,
        user_id: req.user.id
        };

        postsDb.insert(blogPost).then(post => res.status(200).json(post));

});

router.get('/', (req, res) => {
    userDb

    .get()

    .then(users => res.status(200).json(users))

    .catch(() => res.status(500).json({ errorMessage: 'An error has ocurred' }));

});

router.get('/:id', validateUserId, (req, res) => {
    const {id} = req.user;

    userDb

    .getById(id)

    .then(user => res.status(200).json(user))

    .catch(() => res.status(500).json({ error: 'An error has ocurred' }));

});

router.get('/:id/posts', validateUserId, (req, res) => {
    const {id} = req.user;

    userDb

    .getUserPosts(id)

    .then(posts => {
        res.status(200).json(posts);
    })

    .catch(() => res.status(500).json({ err: 'Server Error' }));

});

router.delete('/:id', validateUserId, (req, res) => {
    const {id} = req.user;

    userDb

    .remove(id)

    .then(post =>res.status(200).json({ response: `Deleted post id #${post}` }))

    .catch(() => res.status(500).json({ error: 'Server Error' }));

});

router.put('/:id', validateUserId, (req, res) => {
    const {id} = req.user;
    const {name} = req.body;

    userDb.update(id, {name}).then(user => res

        .status(200)

        .json(user)

        .catch(err => res.status(500).json({err: err}))
    );

});

//custom middleware
function validateUserId(req, res, next) {
    const {id} = req.params;

    userDb

    .getById(id)

    .then(user => {
        if (user) {req.user = user;
            next();
        } else {
            res.status(400).json({ message: 'User Not Found' });
        }
    })

    .catch(() => res.status(400).json({ message: 'Invalid Id' }));
};

function validateUser(req, res, next) {
    if (!req.body) {
            res.status(400).json({ message: 'User data not found' });
        } else if (!req.body.name) {
            res.status(400).json({ message: 'Need username' });
        }
        next();
};

function validatePost(req, res, next) {
    if (!req.body) {
            res.status(400).json({ message: 'User data not found' });
        } else if (!req.body.text) {
            res.status(400).json({ message: 'Need Text' });
        }
        next();
};

module.exports = router;
