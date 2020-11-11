Vote = require('./voteModel');

let chai = require('chai');
let chaiHttp = require('chai-http');
let like = require('chai-like');
let server = require('./index');
let mongoose = require('mongoose');
let asser = require('assert');
const { assert } = require('console');

let should = chai.should();
chai.use(chaiHttp);
chai.use(like);

describe('Votes REST API', () => {
    beforeEach((done) => { //Before each test we empty the database
        Vote.deleteOne({}, (err) => {
            done();
        });
    });

    describe('GET /', () => {
        it('should return homepage', (done) => {
            chai.request(server)
                .get('/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.text.should.contain('Hello World! This is CS3219 Task B.');
                    done();
                });
        });
    });

    describe('GET /api/votes/getVote/{email}', () => {
        it('should get a single vote by the given email', (done) => {
            let vote = new Vote({
                email: 'abc@email.com',
                candidate: 'Donald'
            });
            vote.save((err, vote) => {
                chai.request(server)
                    .get('/api/votes/getVote/' + vote.email)
                    .send(vote)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Getting your ballot');
                        res.body.data[0].should.have.property('email').eql(vote.email);
                        res.body.data[0].should.have.property('candidate');
                        done();
                    });
            });
        });
    });

    describe('POST /api/votes/add/{email}', () => {
        it('should create a new vote', (done) => {
            let vote = new Vote({
                email: 'efg@email.com',
                candidate: 'Joe'
            });

            chai.request(server)
                .post('/api/votes/add/' + vote.email)
                .send(vote)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('data');
                    res.body.should.have.property('message').eql('Vote in ballot box!');
                    res.body.data.should.have.property('email').eql('efg@email.com');
                    res.body.data.should.have.property('candidate').eql('Joe');
                    done();
                });
        });
    });

    describe('PUT /api/votes/update/{email}', () => {
        it('should update a single vote by the given email', (done) => {
            let vote = new Vote({
                email: 'efg@email.com',
                candidate: 'Donald'
            });
            vote.save((err, vote) => {
                chai.request(server)
                    .put('/api/votes/update/' + vote.email)
                    .send({ email: 'efg@email.com', candidate: 'Donald' })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('message').eql('Updated your vote');
                        res.body.data.should.have.property('candidate').eql('Donald');
                        done();
                    });
            });
        });
    });

    describe('DELETE /api/votes/delete/{email}', () => {
        let vote;
        beforeEach((done) => {
            vote = new Vote({
                email: 'efg@email.com',
                candidate: 'Joe'
            });
            vote.save().then(() => done());
        });

        it('should delete a single vote by the given email', (done) => {
            vote
                .delete()
                .then(() => Vote.findOne({ email: 'efg@email.com' }))
                .then((vote) => {
                    assert(vote === null);
                    done();
                });
        });

    });

    after((done) => {
        mongoose.connection.close(done);
    });
});
