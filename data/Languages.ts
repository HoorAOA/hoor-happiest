

export default class Languages {
    languageId: string;
    languageName: string;

    constructor(languageId : string, languageName: string) {
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