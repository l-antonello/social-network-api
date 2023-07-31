const router = require('express').Router();

const {
    getAllThought,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction

  } = require('../../controllers/thoughtController');

router
    .route('/thought')
    .get(getAllThought)
    .post(createThought);

    router
    .route('/thought/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

    router
    .route('/thought/:thoughtId/reactions')
    .post(addReaction)

    router
    .route('/thought/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction);


module.exports = router;
