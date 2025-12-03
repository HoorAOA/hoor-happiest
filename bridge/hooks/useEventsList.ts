
import { useState, useEffect } from 'react';
import { Events } from '../models';
import { fetchEventsList } from '../services/eventService';
import { handleApiError, logError } from '../utils/errorHandler';

interface UseEventsListResult {
    eventsData: Events[] | null;
    isLoadingEvents: boolean;
    errorEvents: string | null;
    refetchEvents: () => void;
}

export const useEventsList = (searchQuery: string = ''): UseEventsListResult => {
    const [eventsData, setEventsData] = useState<Events[] | null>(null);
    const [isLoadingEvents, setIsLoadingEvents] = useState(false);
    const [errorEvents, setErrorEvents] = useState<string | null>(null);

    const fetchData = async () => {
        setIsLoadingEvents(true);
        setErrorEvents(null);
        setEventsData(null);

        try {
            const result = await fetchEventsList(searchQuery);
            setEventsData(result);
        } catch (error) {
            logError('useEventsList', error);
            setErrorEvents(handleApiError(error));
        } finally {
            setIsLoadingEvents(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [searchQuery]);

    const refetchEvents = () => {
        fetchData();
    };

    return { eventsData, isLoadingEvents, errorEvents, refetchEvents };
};
