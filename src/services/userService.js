import apiService from './apiService';

export async function getUser() {
    const response = await apiService.requestApi(`/users`);
    return response;
}