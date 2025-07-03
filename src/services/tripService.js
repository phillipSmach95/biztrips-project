import apiService from "./apiService";

export async function getTrips() {
    const response = await apiService.requestApi('/trips', {
        method: 'GET'
    });
    return Array.isArray(response) ? response : [];
}

export async function addTrip(tripData) {
    const response = await apiService.requestApi('/trips', {
        method: 'POST',
        body: tripData
    });
    return response;
}

export async function getTrip(tripId) {
    const response = await apiService.requestApi(`/trips/${tripId}`, {
        method: 'GET'
    });
    return response;
}

export async function updateTrip(tripId, tripData) {
    const response = await apiService.requestApi(`/trips/${tripId}`, {
        method: 'PUT',
        body: tripData
    });
    return response;
}

export async function deleteTrip(tripId) {
    const response = await apiService.requestApi(`/trips/${tripId}`, {
        method: 'DELETE'
    });
    return response;
}

export default {
    getTrips,
    addTrip,
    getTrip,
    updateTrip,
    deleteTrip
};