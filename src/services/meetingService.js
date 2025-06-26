import tripService from './tripService';

async function fetchMeetings() {
    const trips = await tripService.getTrips();
    const meetings = trips.flatMap(trip => trip.meetings || []);
    return meetings;
}

export async function getMeetings() {
    const meetings = await fetchMeetings();
    return meetings;
}

export async function getMeeting(id) {
    const meetings = await fetchMeetings();
    const meeting = meetings.find(m => m.id === id);
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
    trip.meetings = [ ...trip.meetings || [], meeting ];
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
    const meetings = await fetchMeetings();
    const index = meetings.findIndex(m => m.id === id);
    if (index === -1) {
        // Error Handler
        return;
    }
    meetings.splice(index, 1);
    await tripService.updateTrip(meetings[index].tripId, { meetings });
    return;
}

export default {
    getMeetings,
    getMeeting,
    addMeeting,
    updateMeeting,
    deleteMeeting
}
