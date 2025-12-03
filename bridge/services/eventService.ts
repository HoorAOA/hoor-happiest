
import axios from 'axios';
import { APPCONSTANTS } from '../utils';
import { Events } from '../models';
import { handleApiError, logError } from '../utils/errorHandler';

/**
 * Fetch events list with optional search query
 */
export const fetchEventsList = async (searchQuery: string = ''): Promise<Events[]> => {
    let url = `${APPCONSTANTS.base_url}/events.json?size=10&apikey=Q2JSGSYk3AAisOWAXmp7Bw4RkFb77cMw`;

    if (searchQuery.trim() !== '') {
        url = `${APPCONSTANTS.base_url}/events.json?size=10&apikey=Q2JSGSYk3AAisOWAXmp7Bw4RkFb77cMw&keyword=${searchQuery}&city=[${searchQuery}]`;
    }

    console.log('Fetching events from URL:', url);

    const options = {
        method: 'GET' as const,
        url,
        headers: {
            'Content-Type': 'application/json',
        },
    };
    
    try {
        const response = await axios.request(options);
        const data = response.data;

        if (data && data._embedded && Array.isArray(data._embedded.events)) {
            return data._embedded.events.map(
                (event: Events) =>
                    new Events(event.id, event.name, event.dates, event.images, event.info)
            );
        }

        return [];
    } catch (error) {
        logError('fetchEventsList', error);
        throw new Error(handleApiError(error));
    }
};

/**
 * Fetch event details by ID
 */
export const fetchEventDetails = async (eventId: string): Promise<Events> => {
    if (!eventId) {
        throw new Error('Event ID is required');
    }

    const url = `${APPCONSTANTS.base_url}/events/${eventId}.json?apikey=Q2JSGSYk3AAisOWAXmp7Bw4RkFb77cMw`;

    const options = {
        method: 'GET' as const,
        url,
        headers: {
            'Content-Type': 'application/json',
        },
    };

    try {
        const response = await axios.request(options);
        const data = response.data;

        if (data) {
            return new Events(data.id, data.name, data.dates, data.images, data.info);
        }

        throw new Error('No event data received');
    } catch (error) {
        logError('fetchEventDetails', error);
        throw new Error(handleApiError(error));
    }
};
