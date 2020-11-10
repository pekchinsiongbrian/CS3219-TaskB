import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Button } from 'react-bootstrap';
import { postVote, updateVote } from '../actions/vote';
import '../styles/Form.css';

const VotingForm = ({ header, voteType }) => {
    
    const [emailForFirstVote, setEmailForFirstVote] = useState('');
    const [emailForChangeVote, setEmailForChangeVote] = useState('');

    const [choiceForFirstVote, setChoiceForFirstVote] = useState('');
    const [choiceForChangeVote, setChoiceForChangeVote] = useState('');

    const dispatch = useDispatch();

    const handleChoiceChange = (e) => {
        e.persist();
        if (voteType === 'first-vote') {
            setChoiceForFirstVote(e.target.value);
        } else {
            setChoiceForChangeVote(e.target.value);
        }
    }

    const handleEmailChange = (e) => {
        if (voteType === 'first-vote') {
            setEmailForFirstVote(e.target.value);
        } else {
            setEmailForChangeVote(e.target.value);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (voteType === 'first-vote') {
            if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(emailForFirstVote) && emailForFirstVote.length > 0) || choiceForFirstVote === '') {
                setEmailForFirstVote('');
                setChoiceForFirstVote('');
                return;
            }
        } else {
            if (!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(emailForChangeVote) && emailForChangeVote.length > 0) || choiceForChangeVote === '') {
                setEmailForChangeVote('');
                setChoiceForChangeVote('');
                return;
            }
        }

        if (voteType === "first-vote") {
            const payload = {
                email: emailForFirstVote,
                candidate: choiceForFirstVote
            }
            dispatch(postVote(payload));
        } else { // change vote
            const payload = {
                email: emailForChangeVote,
                candidate: choiceForChangeVote
            }
            dispatch(updateVote(payload));
        }

        setEmailForFirstVote('');
        setChoiceForFirstVote('');

        setEmailForChangeVote('');
        setChoiceForChangeVote('');
    }

    const email = voteType === 'first-vote' ? emailForFirstVote : emailForChangeVote;
    const choice = voteType === 'first-vote' ? choiceForFirstVote : choiceForChangeVote;

    return (
        <div className="form">
            <Form onSubmit={handleSubmit}>
                <h3>{header}</h3>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address: </Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={handleEmailChange} value={email} />
                    <br></br>
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <br></br>
                <Form.Check
                    value="Donald the Charizard"
                    label="Donald the Charizard"
                    type='radio'
                    onChange={handleChoiceChange}
                    checked={choice === "Donald the Charizard"} />
                <Form.Check 
                    value="Joe the Alakazam"
                    label="Joe the Alakazam"
                    type='radio'
                    onChange={handleChoiceChange}
                    checked={choice === "Joe the Alakazam"} />
                <Button variant="primary" type="submit">
                    Vote!
                </Button>
            </Form>
        </div>
    
    );

}

export default VotingForm;