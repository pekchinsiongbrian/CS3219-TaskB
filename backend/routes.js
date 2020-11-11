const router = require('express').Router();

const voteController = require('./voteController');

router.route('/votes')
    .get(voteController.index) // GET all - comment out
    .delete(voteController.deleteAll); // Comment out
router.route('/votes/getVote/:email')
    .get(voteController.view);
router.route('/votes/add/:email')
    .post(voteController.new);
router.route('/votes/update/:email')
    .put(voteController.update);
router.route('/votes/delete/:email')
    .delete(voteController.delete);

module.exports = router;
