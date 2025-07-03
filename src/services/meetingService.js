import tripService from './tripService';

function ensureArray(arr) {
    return Array.isArray(arr) ? arr : [];
}

async function fetchMeetings() {
    const trips = await tripService.getTrips();
    // Attach tripId to each meeting
    const meetings = trips.flatMap(trip => ensureArray(trip.meetings).map(m => ({ ...m, tripId: trip._id })));
    return ensureArray(meetings);
}

export async function getMeetings() {
    const meetings = await fetchMeetings();
    return ensureArray(meetings);
}

export async function getMeeting(id) {
    const meetings = await fetchMeetings();
    const meeting = meetings.find(m => m.meetingId === id);
    // Error Handler
    return meeting;
}

export async function addMeeting(meeting) {
    const tripId = meeting.tripId;
    const trip = await tripService.getTrip(tripId);
    if (!trip) {
        // Error Handler
        return;
    }
    trip.meetings = [ ...ensureArray(trip.meetings), meeting ];
    await tripService.updateTrip(tripId, trip);
    return;
}

export async function updateMeeting(id, updatedMeeting) {
    const tripId = updatedMeeting.tripId;
    const trip = await tripService.getTrip(tripId);
    if (!trip) {
        // Error Handler
        return;
    }
    trip.meetings = ensureArray(trip.meetings);
    const meetingIndex = trip.meetings.findIndex(m => m.id === id);
    if (meetingIndex === -1) {
        // Error Handler
        return;
    }
    trip.meetings[meetingIndex] = { ...trip.meetings[meetingIndex], ...updatedMeeting };
    await tripService.updateTrip(tripId, trip);
    return;
}

export async function deleteMeeting(id) {
    // Find the trip containing the meeting
    const trips = await tripService.getTrips();
    let foundTrip = null;
    let meetingIndex = -1;
    for (const trip of trips) {
        const meetingsArr = ensureArray(trip.meetings);
        const idx = meetingsArr.findIndex(m => m.id === id || m.meetingId === id);
        if (idx !== -1) {
            foundTrip = trip;
            meetingIndex = idx;
            break;
        }
    }
    if (!foundTrip || meetingIndex === -1) {
        // Error Handler
        return;
    }
    // Remove the meeting from the trip's meetings array
    const updatedMeetings = ensureArray(foundTrip.meetings).filter((m, idx) => idx !== meetingIndex);
    await tripService.updateTrip(foundTrip._id, { ...foundTrip, meetings: updatedMeetings });
    return;
}

export default {
    getMeetings,
    getMeeting,
    addMeeting,
    updateMeeting,
    deleteMeeting
}
