const router = require('express').Router();

const voteController = require('./voteController');

router.route('/votes')
    .get(voteController.index)
    .post(voteController.new)
    .delete(voteController.deleteAll); // Comment out
router.route('/votes/:email')
    .get(voteController.view)
    .put(voteController.update)
    .delete(voteController.delete);

module.exports = router;
