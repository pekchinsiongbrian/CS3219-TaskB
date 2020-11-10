import axios from '../myAxios';
import * as actionTypes from './actionTypes';

// GET /votes/{email}
export const getVote = (payload) => (dispatch) => {
    const { email } = payload;
    
    axios.get('/votes/getVote/' + email)
        .then((res) => {
            dispatch({
                type: actionTypes.GET_VOTE,
                payload: res
            });
        })
        .catch((error) => {
            dispatch({
                type: actionTypes.SET_ERROR,
                payload: 'ERROR: Unable to find vote. ' + error.message + '.\n\nThis could be due to failed connection, or this email has not been used in voting yet.',
            });
        });
};

// POST /votes
export const postVote = (payload) => (dispatch) => {
    const voteToAdd = axios.post('/votes/add', JSON.stringify(payload));

    Promise.all([voteToAdd])
        .then(([res]) => {
            const postVoteResponse = res;
            dispatch({
                type: actionTypes.ADD_VOTE,
                payload: {
                    postedVote: postVoteResponse.data,
                },
            });
        })
        .catch((error) => {
            dispatch({
                type: actionTypes.SET_ERROR,
                payload: 'ERROR: Unable to cast your vote: ' + error.message + '.\n\nThis could be due to failed connection, or this email has already been used in voting.',
            });
        });
};

// PUT /votes/{email}
export const updateVote = (payload) => (dispatch) => {
    axios.put('/votes/update/' + payload.email, JSON.stringify(payload))
        .then((res) => {
            dispatch({
                type: actionTypes.UPDATE_VOTE,
                payload: res.data,
            });
        })
    .catch((error) => {
        dispatch({
            type: actionTypes.SET_ERROR,
            payload: 'ERROR: Unable to update your vote. ' + error.message + '.\n\nThis could be due to failed connection, or this email has not been used in voting yet.',
        });
    });
};

// DELETE /votes/{email}
export const deleteVote = (payload) => (dispatch) => {
    const { email } = payload;

    axios.delete('/votes/delete/' + email, { data: email })
        .then((res) => {
            dispatch({
                type: actionTypes.DELETE_VOTE,
                payload: res.data
            });
        })
        .catch((error) => {
            dispatch({
                type: actionTypes.SET_ERROR,
                payload: 'ERROR: Unable to remove your ballot: ' + error.message + '.',
            });
        });
};