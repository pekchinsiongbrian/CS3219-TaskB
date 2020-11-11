const router = require('express').Router();

const voteController = require('./voteController');

router.route('/votes')
    .get(voteController.index) // GET all - not an official feature, for quick getting during development only
    .delete(voteController.deleteAll); // DELETE all - not an official feature, for quick deletion during development only
router.route('/votes/getVote/:email')
    .get(voteController.view);
router.route('/votes/add/:email')
    .post(voteController.new);
router.route('/votes/update/:email')
    .put(voteController.update);
router.route('/votes/delete/:email')
    .delete(voteController.delete);

module.exports = router;
