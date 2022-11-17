import * as googleTranslateTTS from 'google-tts-api';
import Payload from '../Payload.js';
import { Provider, ProviderExtras } from './Provider.js';

export enum GoogleTranslateLanguage {
  JAPANESE = 'ja-JP',
  KOREAN = 'ko-KR',
}
export type GoogleTranslateExtras = ProviderExtras & {
  lang: GoogleTranslateLanguage;
};

export default class GoogleTranslateProvider extends Provider {
  constructor(sentence: string, extras: GoogleTranslateExtras) {
    super(sentence, extras);
  }
  createPayload(): Promise<Payload[]> {
    return new Promise((resolve, reject) => {
      try {
        const data = googleTranslateTTS.getAllAudioUrls(this.sentence, {
          lang: this.extras.lang,
          slow: false,
          splitPunct: ',.?!',
        });
        resolve(
          data.map(({ url, shortText }) => {
            return new Payload(url, shortText);
          })
        );
      } catch (error) {
        reject(error);
      }
    });
  }
}
