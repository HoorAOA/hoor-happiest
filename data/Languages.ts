

export default class Languages {
    languageId: number;
    languageName: string;

    constructor(languageId : number, languageName: string) {
        this.languageId = languageId;
        this.languageName = languageName;
    }

    getLanguageId() {
        return `${this.languageId}`;
    }

    getLanguageName() {
        return `${this.languageName}`;
    }
}