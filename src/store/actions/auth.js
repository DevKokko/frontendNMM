import * as actionTypes from './actionTypes';
import * as actions from './index';

export const authSuccess = (token, userId, username, isAdmin) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userId', userId);
    localStorage.setItem('username', username);
    if(isAdmin)
        localStorage.setItem('isAdmin', 1);

    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId,
        username: username,
        isAdmin: isAdmin
    };
};

export const removeAuth = () => {
    localStorage.removeItem('token');
    // localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    localStorage.removeItem('isAdmin');

    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const logOut = () => {
    return dispatch => {
        dispatch(removeAuth());
        dispatch(actions.resetBoardGameState());
    };
}
