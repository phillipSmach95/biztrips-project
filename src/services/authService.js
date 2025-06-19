import apiService from './apiService';

export async function register({ firstName, lastName, email, password }) {
    const response = await apiService.requestApi('/register', {
        method: 'POST',
        body: { firstName, lastName, email, password }
    });
    return response;
}

export async function login({ email, password }) {
    const response = await apiService.requestApi('/login', {
        method: 'POST',
        body: { email, password }
    });
    return response;
}

export async function logout() {
    const response = await apiService.requestApi('/logout', {
        method: 'POST'
    });
    return response;
}
