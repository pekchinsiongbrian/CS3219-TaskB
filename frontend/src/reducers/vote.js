import * as actionTypes from '../actions/actionTypes';

const initialState = {};

const getVote = (state, payload) => {
    const data = payload.data;
    if (data !== '') {
        const message = data.email + ' has currently voted for ' + data.candidate;
        alert(message);
    } else {
        alert('The email provided has not been used in voting yet.')
    }
    return state;
}

const setError = (state, payload) => {
    alert(payload);
    return state;
}

const addVote = (state, { postedVote }) => {
    const message = 'Your ballot for ' + postedVote.candidate + ' has been cast!';
    alert(message);
    return state;
}

const updateVote = (state, payload) => {
    const message = 'Your ballot has been updated. You are now voting for ' + payload.candidate + '!';
    alert(message);
    return state;
}

const deleteVote = (state, payload) => {
    if (payload.deletedCount > 0) {
        alert('Your ballot has been deleted.');
    } else {
        alert('Delete failed: The email provided has not been used in voting yet.');
    }
    return state;
}

const reducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case actionTypes.GET_VOTE:
            return getVote(state, payload);
        case actionTypes.SET_ERROR:
            return setError(state, payload);
        case actionTypes.ADD_VOTE:
            return addVote(state, payload);
        case actionTypes.UPDATE_VOTE:
            return updateVote(state, payload);
        case actionTypes.DELETE_VOTE:
            return deleteVote(state, payload);
        default:
            return state;
    }
}

export default reducer;
