import { history } from '../utils/history';

export function saveInLocalStorage(name, value) {
    localStorage.setItem(name, value);
};

export function saveToken(token) {
    localStorage.setItem('token', JSON.stringify(token));
};

export function saveUserType(userType) {
    localStorage.setItem('user', userType);
};

export function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('position');
    localStorage.removeItem('userId');
    history.push('/login');
};

export function checkLoginStatus() {
    return !!localStorage.getItem('token');
};

export function getUserType() {
    return localStorage.getItem('user');
};

export function getFromLocal(name) {
    return localStorage.getItem(name);
};