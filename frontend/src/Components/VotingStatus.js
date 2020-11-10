import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { getVote, deleteVote } from '../actions/vote';
import '../styles/VotingStatus.css';

const VotingStatus = () => {

    const [voteStatus, setVoteStatus] = useState({ status: false, votedFor: '' });
    const [emailForCheck, setEmailForCheck] = useState('');
    const [emailForDelete, setEmailForDelete] = useState('');

    const statusOfVote = useSelector((state) => state.vote.status);
    const dispatch = useDispatch();

    useEffect(() => {
        setVoteStatus(statusOfVote);
    }, [statusOfVote]);

    const handleCheckEmail = (e) => {
        // e.persist();
        console.log(e.target.value);
        setEmailForCheck(e.target.value);
    };

    const handleDeleteEmail = (e) => {
        // e.persist();
        console.log(e.target.value);
        setEmailForDelete(e.target.value);
    };

    const handleCheck = (e) => {
        e.preventDefault();
        const payload = {
            email: emailForCheck
        }
        dispatch(getVote(payload));
        setEmailForCheck('');
    };

    const handleDelete = (e) => {
        e.preventDefault();
        const payload = {
            email: emailForDelete
        }
        dispatch(deleteVote(payload));
        setEmailForDelete('');
    };

    const checker = (
        <div>
            <Form onSubmit={handleCheck}>
                <h2>Check your vote</h2>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address to check vote: </Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={handleCheckEmail} value={emailForCheck} />
                    <br></br>
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Button variant="secondary" type="submit">
                    Check
                </Button>
            </Form>
        </div>
    );

    const deleter = (
        <div>
            <Form onSubmit={handleDelete}>
                <h2>Delete your vote</h2>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address to delete vote: </Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={handleDeleteEmail} value={emailForDelete} />
                    <br></br>
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Button variant="secondary" type="submit">
                    Delete
                </Button>
            </Form>
        </div>
    )

    if (voteStatus.status) { // If the email keyed in has voted
        return (
            <div>
                <div className="statusComponent">
                    {checker}
                    <h3>You have already voted for {voteStatus.votedFor}. However, you may change your vote anytime you want.</h3>
                    <h3>Just fill in the voter form with the email that you used.</h3>
                </div>
                <div className="statusComponent">
                    {deleter}
                </div>
            </div>
            
        );
    } else { // If the email keyed in has NOT voted
        return (
            <div>
                <div className="statusComponent">
                    {checker}
                    <h3>You have not voted yet. Please fill in the form below to vote.</h3>
                </div>
                <div className="statusComponent">
                    {deleter}
                </div>
            </div>
        );
    }
}

export default VotingStatus;