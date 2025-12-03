
import { useState, useEffect } from 'react';
import { Events } from '../models';
import { fetchEventDetails } from '../services/eventService';
import { handleApiError, logError } from '../utils/errorHandler';

interface UseEventDetailsResult {
    eventsDetailsData: Events[] | null;
    isLoadingEventDetails: boolean;
    errorEventDetails: string | null;
    refetchEventDetails: () => void;
}

export const useEventDetails = (loadingId: string | null): UseEventDetailsResult => {
    const [eventsDetailsData, setEventDetailsData] = useState<Events[] | null>(null);
    const [isLoadingEventDetails, setIsLoadingEventDetails] = useState(false);
    const [errorEventDetails, setErrorEventDetails] = useState<string | null>(null);

    const fetchData = async () => {
        if (loadingId == null) {
            return;
        }

        setIsLoadingEventDetails(true);
        setErrorEventDetails(null);
        setEventDetailsData(null);

        try {
            const result = await fetchEventDetails(loadingId);
            setEventDetailsData([result]);
        } catch (error) {
            logError('useEventDetails', error);
            setErrorEventDetails(handleApiError(error));
        } finally {
            setIsLoadingEventDetails(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [loadingId]);

    const refetchEventDetails = () => {
        fetchData();
    };

    return { eventsDetailsData, isLoadingEventDetails, errorEventDetails, refetchEventDetails };
};
