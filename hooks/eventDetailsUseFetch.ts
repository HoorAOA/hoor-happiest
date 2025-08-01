import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import APPCONSTANTS from '../constants/AppConstants';
import { Events } from '../data/Events';

const eventDetailsUseFetch = ({ loadingId }: { loadingId: string | null}) => {
    const [eventsDetailsData, setEventDetailsData] = useState<Events[] | null>(null);
    const [isLoadingEventDetails, setIsLoadingEventDetails] = useState(false);
    const [errorEventDetails, setErrorEventDetails] = useState<string | null>(null);

    const fetchData = async () => {

        if(loadingId == null){
            return;
        }

        setIsLoadingEventDetails(true);

        const url = `${APPCONSTANTS.base_url}/events/${loadingId}.json?apikey=Q2JSGSYk3AAisOWAXmp7Bw4RkFb77cMw`

        const options = {
            method: "GET",
            url: url,
            headers: {
                "Content-Type": 'application/json'
            }
        };

        console.log('apiClient=>>>>>>:', url);
        console.log('**************************************');

        try {
            const response = await axios.request(options);

            const data = response.data

            if (data) {
                const result = [new Events(data.id, data.name, data.dates, data.images, data.info)];
                
                setEventDetailsData(result);
            } else {
                setEventDetailsData([]);
            }

        } catch (errorStack) {
            console.log("errorStack", errorStack)

            if (axios.isAxiosError(errorStack)) {
                setErrorEventDetails(errorStack.response?.data.message);
            } else if (errorStack instanceof Error) {
                setErrorEventDetails(errorStack.message);
            } else {
                setErrorEventDetails(String(errorStack));
            }
        } finally {
            setIsLoadingEventDetails(false);
        }
    };

    useEffect(() => {
        setErrorEventDetails(null)
        setEventDetailsData(null)
        fetchData();
    }, []);

    const refetchEventDetails = () => {
        setErrorEventDetails(null)
        setEventDetailsData(null)
        fetchData();
    };

    return { eventsDetailsData, isLoadingEventDetails, errorEventDetails, refetchEventDetails };


};

export default eventDetailsUseFetch;