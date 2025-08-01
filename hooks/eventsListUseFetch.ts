import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import APPCONSTANTS from '../constants/AppConstants';
import { Events } from '../data/Events';

const eventsListUseFetch = ({ searchQuery}: { searchQuery: string}) => {
    const [eventsData, setEventsData] = useState<Events[] | null>(null);
    const [isLoadingEvents, setIsLoadingEvents] = useState(false);
    const [errorEvents, setErrorEvents] = useState<string | null>(null);

    const fetchData = async () => {

        setIsLoadingEvents(true);

        var url = `${APPCONSTANTS.base_url}/events.json?size=10&apikey=Q2JSGSYk3AAisOWAXmp7Bw4RkFb77cMw`

        if(searchQuery != ''){
             url = `${APPCONSTANTS.base_url}/events.json?size=10&apikey=Q2JSGSYk3AAisOWAXmp7Bw4RkFb77cMw?keyword=${searchQuery}&city=[${searchQuery}]`
        }

        
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
            const result = response.data._embedded.events.map((event: Events) => new Events(event.id, event.name
                , event.dates, event.images, event.info))

            setEventsData(result);

        } catch (errorStack) {
            console.log("errorStack", errorStack)

            if (axios.isAxiosError(errorStack)) {
                setErrorEvents(errorStack.response?.data.message);
            } else if (errorStack instanceof Error) {
                setErrorEvents(errorStack.message);
            } else {
                setErrorEvents(String(errorStack));
            }
        } finally {
            setIsLoadingEvents(false);
        }
    };

    useEffect(() => {
        setErrorEvents(null)
        setEventsData(null)
        fetchData();
    }, []);

    const refetchEvents = () => {
        setErrorEvents(null)
        setEventsData(null)
        fetchData();
    };

    return { eventsData, isLoadingEvents, errorEvents, refetchEvents };


};

export default eventsListUseFetch;