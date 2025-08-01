
export class Events {
    id: string;
    name: string;
    dates: EventDate;
    images: EventImages[];
    info: string;

    constructor(id : string, name: string, dates: EventDate
        , images: EventImages[], info: string) {
        this.id = id;
        this.name = name;
        this.dates = dates;
        this.images = images;
        this.info = info;
    }
}

export class EventImages {
    url: string;

    constructor(url : string) {
        this.url = url;
    }
}

export class EventDate {
    start: StartDate;
    timezone: string;

    constructor(start : StartDate, timezone : string) {
        this.start = start;
        this.timezone = timezone;
    }
}

export class StartDate {
    localDate: string;
    localTime: string;
    dateTime: string;

    constructor(localDate : string, localTime : string, dateTime : string) {
        this.localDate = localDate;
        this.localTime = localTime;
        this.dateTime = dateTime;
    }
}