import apiService from './apiService';

export async function getUsers() {
    const response = await apiService.requestApi(`/users`, {
        method: 'GET'
    });
    return Array.isArray(response) ? response : [];
}

export default {
    getUsers
};