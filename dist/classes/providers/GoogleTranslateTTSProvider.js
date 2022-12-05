import * as googleTranslateTTS from 'google-tts-api';
import Payload from '../Payload.js';
import { Provider } from './Provider.js';
export var GoogleTranslateLanguage;
(function (GoogleTranslateLanguage) {
    GoogleTranslateLanguage["JAPANESE"] = "ja-JP";
    GoogleTranslateLanguage["KOREAN"] = "ko-KR";
})(GoogleTranslateLanguage || (GoogleTranslateLanguage = {}));
export default class GoogleTranslateProvider extends Provider {
    constructor(sentence, extras) {
        super(sentence, extras);
    }
    createPayload() {
        return new Promise((resolve, reject) => {
            try {
                const data = googleTranslateTTS.getAllAudioUrls(this.sentence, {
                    lang: this.extras.lang,
                    slow: false,
                    splitPunct: ',.?!',
                });
                resolve(data.map(({ url, shortText }) => {
                    return new Payload(url, shortText);
                }));
            }
            catch (error) {
                reject(error);
            }
        });
    }
}
