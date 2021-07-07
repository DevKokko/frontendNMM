import axios from './axiosConfigNodeRed';

export const API = {
    signIn,
    signUp,
    logOut,
    checkEmailValidity,
    checkUsernameValidity,
    reportUser,
    banUser,
    addFriend,
    removeFriend,
    getProfilePic,
    updateProfile,
    uploadProfilePic,
    getFriends,
    getUsers,
    getUserInfo,
    getLeaderboard,
    verifyAccount,
    adminUpdateUser
};

function signIn(axios, jsonRequest) 
{
    return axios.post('/users/signin', jsonRequest)
        .then( response =>  response ? response.data : null)
        .catch( err => err);
}

function signUp(axios, jsonRequest) 
{
    return axios.post('/users/signup', jsonRequest)
        .then( response =>  response ? response.data : null)
        .catch( err => err);
}

function logOut(axios, jsonRequest) 
{
    return axios.post('/log_out', jsonRequest)
        .then( response =>  response ? response.data : null)
        .catch( err => err);
}

function checkEmailValidity(axios, email)
{
    return axios.get('/users/signup', 
            {
                params: {
                    email: email
                }
            }
        ).then( response =>  response ? response.data : null)
        .catch( err => err);
}

function checkUsernameValidity(axios, username)
{
    return axios.get('/users/signup',
            {
                params: {
                    username: username
                }
            }
        ).then( response =>  response ? response.data : null)
        .catch( err => err);
}

function reportUser(myId, userId)
{
    return axios.post('/users/report', 
            {
                params: {
                    reporter: myId,
                    reported: userId
                }
            }
        ).then( response =>  response ? response.data : null)
        .catch( err => err);
}

function banUser(userId)
{
    return axios.post('/users/ban', 
            {
                params: {
                    userId: userId
                }
            }
        ).then( response =>  response ? response.data : null)
        .catch( err => err);
}

function addFriend(myId, friendId)
{
    return axios.post('/users/add', 
            {
                params: {
                    user_1: myId,
                    user_2: friendId
                }
            }
        ).then( response =>  response ? response.data : null)
        .catch( err => err);
}

function removeFriend(myId, friendId)
{
    return axios.post('/users/remove', 
            {
                params: {
                    user_1: myId,
                    user_2: friendId
                }
            }
        ).then( response =>  response ? response.data : null)
        .catch( err => err);
}

function getProfilePic(username){
    return axios.get(`/profile/picture/${username}`)
        .then( response =>  response ? response.data : null)
        .catch( err => err);
}

function updateProfile(axios, jsonRequest) 
{
    return axios.put('/users/update', jsonRequest)
        .then( response =>  response ? response.data : null)
        .catch( err => err);
}

function uploadProfilePic(file, username){
    var formData = new FormData();
    formData.append("image", file);
    formData.append("username", username);
    return axios.post('/profile/picture', formData, {
        headers: {
        'Content-Type': 'multipart/form-data'
        }
    })
    .then( response =>  response ? response.data : null)
    .catch( err => err);
}

function getFriends(userId){
    return axios.get(`/users/friends/${userId}`)
        .then( response =>  response ? response.data : null)
        .catch( err => err);
}

function getUsers(){
    return axios.get(`/users/allUsers`)
        .then( response =>  response ? response.data : null)
        .catch( err => err);
}

function getLeaderboard(){
    return axios.get(`/users/leaderboard`)
        .then( response =>  response ? response.data : null)
        .catch( err => err);
}

function getUserInfo(axios){
    return axios.get(`/user`)
        .then( response =>  response ? response.data : null)
        .catch( err => err);
}


function verifyAccount(axios, jsonRequest) 
{
    return axios.put('/verify_account', jsonRequest)
        .then( response =>  response ? response.data : null)
        .catch( err => console.error(err));
}

function adminUpdateUser(axios, jsonRequest) 
{
    return axios.put('/admin/users/update', jsonRequest)
        .then( response =>  response ? response.data : null)
        .catch( err => err);
}