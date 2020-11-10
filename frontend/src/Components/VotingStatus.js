import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { getVote, deleteVote } from '../actions/vote';
import '../styles/VotingStatus.css';

const VotingStatus = () => {

    const [emailForCheck, setEmailForCheck] = useState('');
    const [emailForDelete, setEmailForDelete] = useState('');

    const dispatch = useDispatch();

    const handleCheckEmail = (e) => {
        setEmailForCheck(e.target.value);
    };

    const handleDeleteEmail = (e) => {
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
                </Form.Group>
                <Button variant="secondary" type="submit">
                    Delete
                </Button>
            </Form>
        </div>
    )

    return (
        <div>
            <div className="statusComponent">
                {checker}
            </div>
            <div className="statusComponent">
                {deleter}
            </div>
        </div>
        
    );
}

export default VotingStatus;