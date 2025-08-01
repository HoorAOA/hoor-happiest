
export default class FavouriteEvents {
    id: string;
    name: string;
    startDate: string;
    imagesUrl: string;

    constructor(id : string, name: string, startDate: string
        , imagesUrl: string) {
        this.id = id;
        this.name = name;
        this.startDate = startDate;
        this.imagesUrl = imagesUrl;
    }
}