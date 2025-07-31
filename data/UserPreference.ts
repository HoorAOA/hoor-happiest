export default class UserPreference {
    key: string;
    value: string;

    constructor(key : string, value: string) {
        this.key = key;
        this.value = value;
    }

    getValue() {
        return `${this.value}`;
    }
}