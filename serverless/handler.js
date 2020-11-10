'use strict';

require('dotenv').config({ path: './variables.env' });
const connectToDatabase = require('./db');
const Vote = require('vote.model.js');

const replacer = (key, value) => {
    return (value == null) ? "" : value
}

const corsHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
};

// GET /votes/{email}
module.exports.getVote = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    console.log(event);

    const email = event.pathParameters.email;
    console.log(email);
    console.log(typeof email);

    connectToDatabase().then(() => {
        Vote.findOne({ "email": email })
            .then((vote) => 
                callback(null, {
                    statusCode: 200,
                    body: JSON.stringify(vote, replacer),
                    headers: corsHeaders
                })
            )
            .catch((err) => 
                callback(null, {
                    statusCode: err.statusCode || 500,
                    headers: { 'Content-Type': 'text/plain' },
                    body: 'Unable to find vote.',
                })
            );
    });
};

// POST /votes
module.exports.postVote = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;
    connectToDatabase().then(() => {
        Vote.create(JSON.parse(event.body))
            .then((body) =>
                callback(null, {
                    statusCode: 200,
                    body: JSON.stringify(body),
                    headers: corsHeaders,
                })
            )
            .catch((err) =>
                callback(null, {
                    statusCode: err.statusCode || 500,
                    headers: { 'Content-Type': 'text/plain' },
                    body: 'Unable to cast your vote.',
                })
            );
    });
};

// PUT /votes/{email}
module.exports.updateVote = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    const body = JSON.parse(event.body); // email, candidate
    console.log(body);
    const filter = { email: body.email };
    const update = { candidate: body.candidate };

    connectToDatabase().then(() => {
        Vote.findOneAndUpdate(filter, update, { new: true })
            .then((body) =>
                callback(null, {
                    statusCode: 200,
                    body: JSON.stringify(body),
                    headers: corsHeaders,
                })
            )
            .catch((err) =>
                callback(null, {
                    statusCode: err.statusCode || 500,
                    headers: { 'Content-Type': 'text/plain' },
                    body: 'Unable to update your vote.',
                })
            );
    });
    
};

// DELETE /votes/{email}
module.exports.deleteVote = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    const email = event.body;
    console.log(email);

    connectToDatabase().then(() => {
        Vote.deleteOne({ "email": email })
            .then((body) =>
                callback(null, {
                    statusCode: 200,
                    body: JSON.stringify(body),
                    headers: corsHeaders,
                })
            )
            .catch((err) =>
                callback(null, {
                    statusCode: err.statusCode || 500,
                    headers: { 'Content-Type': 'text/plain' },
                    body: 'Unable to remove your ballot.',
                })
            );
    });
};