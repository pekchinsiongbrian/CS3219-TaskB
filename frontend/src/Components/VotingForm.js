import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import '../styles/Form.css';

const VotingForm = ({ header, voteType }) => {
    
    const [email, setEmail] = useState('');
    const [choice, setChoice] = useState('');

    const handleChoiceChange = (e) => {
        e.persist();
        console.log(e.target.value);
        setChoice(e.target.value);
    }

    const handleEmailChange = (e) => {
        console.log(e.target.value);
        setEmail(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email) && email.length > 0) {
            console.log('Valid email');
        } else {
            console.log('Invalid email');
            return;
        }

        if (voteType === "first-vote") {
            return;
        } else { // change vote
            return;
        }
    }

    return (
        <div className="form">
            <Form onSubmit={handleSubmit}>
                <h3>{header}</h3>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address: </Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={handleEmailChange} />
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