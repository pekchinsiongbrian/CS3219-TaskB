import axios from '../myAxios';
import * as actionTypes from './actionTypes';

export const initStore = () => (dispatch) => {
    dispatch({
        type: actionTypes.INIT_STORE,
        payload: null,
    })
};

// GET /votes/{email}
export const getVote = (payload) => (dispatch) => {
    console.log('Getting your vote...');
    const { email } = payload;
    const voteToGet = axios.post('/votes/getVote' + email);

    Promise.all([voteToGet])
        .then(([res]) => {
            const getVoteResponse = res;
            dispatch({
                type: actionTypes.GET_VOTE,
                payload: {
                    retrievedVote: getVoteResponse.data
                }
            });
        })
        .catch((error) => {
            alert(error);
            dispatch({
                type: actionTypes.SET_ERROR,
                payload: 'ERROR: Unable to find vote. ' + error.message,
            });
        });
};

// POST /votes
export const postVote = (payload) => (dispatch) => {
    console.log('Adding your ballot...');

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
                payload: 'ERROR: Unable to cast your vote: ' + error.message + '. This could be due to failed connection, or your email has already been used in voting.',
            });
        });
};

// PUT /votes/{email}
export const updateVote = (payload) => (dispatch) => {
    console.log('Updating vote...');

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
            payload: 'ERROR: Unable to update your vote. ' + error.message,
        });
    });
};

// DELETE /votes/{email}
export const deleteVote = (payload) => (dispatch) => {
    console.log('Deleting your vote...');
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
            payload: 'ERROR: Unable to remove your ballot: ' + error.message,
            });
        });
};