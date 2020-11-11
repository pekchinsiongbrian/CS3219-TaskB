Vote = require('./voteModel');

// GET all - not an official feature, for quick getting during development only
exports.index = (req, res) => {
    Vote.get((err, votes) => {
        if (err) {
            return res.json({
                status: 'error',
                message: err,
            });
        } else {
            return res.json({
                status: 'success',
                message: 'All votes retrieved successfully',
                data: votes
            });
        }
    });
};

// GET single vote
exports.view = (req, res) => {
    const email = req.body.email;
    Vote.find({ email }, (err, vote) => {
        if (err) {
            res.send(err);
        } else {
            return res.json({
                message: 'Getting your ballot',
                data: vote
            });
        }
    });
};

//POST
exports.new = (req, res) => {
    const vote = new Vote();
    vote.email = req.body.email;
    vote.candidate = req.body.candidate;

    vote.save((err) => {
        if (err) {
            return res.json({
                status: 'error',
                message: err,
            });
        } else {
            return res.json({
                message: 'Vote in ballot box!',
                data: vote
            });
        }
    })
};

// PUT
exports.update = (req, res) => {
    const email = req.body.email;
    Vote.findOne({ email }, (err, vote) => {
        if (err) {
            res.satusCode = 400
            return res.json({
                message: 'Bad request'
            });
        }

        if (!vote) {
            res.statusCode = 404
            return res.json({
                message: 'Vote not found',
                data: null
            });
        }

        vote.email = req.body.email;
        vote.candidate = req.body.candidate;

        vote.save((err) => {
            if (err) {
                res.json(err);
            } else {
                return res.json({
                    message: 'Updated your vote',
                    data: vote
                });
            }
        });
    });
};

// DELETE
exports.delete = (req, res) => {
    Vote.deleteOne({
        email: req.body.email
    }, (err, vote) => {
        if (err) {
            res.send(err);
        } else if (vote.deletedCount === 0) {
            res.statusCode = 404
            return res.json({
                status: 'failed',
                message: 'Unable to find and delete vote'
            })
        } else {
            return res.json({
                status: 'success',
                message: 'Ballot deleted'
            });
        }
    });
};

// DELETE all - not an official feature, for quick deletion during development only
exports.deleteAll = (req, res) => {
    Vote.deleteMany({}, (err, vote) => {
        if (err) {
            res.send(err);
        } else if (vote.deletedCount === 0) {
            res.statusCode = 404
            return res.json({
                status: 'failed',
                message: 'Unable to find and delete votes'
            })
        } else {
            return res.json({
                status: 'success',
                message: 'All ballots deleted'
            }); 
        }
    });
};
