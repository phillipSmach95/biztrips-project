import apiService from './apiService';

export async function getUsers() {
    const response = await apiService.requestApi(`/users`, {
        method: 'GET'
    });
    return response;
}

export default {
    getUsers
};