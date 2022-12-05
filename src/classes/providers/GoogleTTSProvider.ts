import Payload from '../Payload.js';
import type { GoogleTranslateExtras } from './GoogleTranslateTTSProvider';
import { Provider } from './Provider.js';
import googleTTS from '@google-cloud/text-to-speech';
import { createFileName } from '../../functions/utils.js';
import fs from 'fs/promises';
import path from 'path';

export enum GoogleTTSName {
  KR_STANDARD_A = 'ko-KR-Standard-A',
  JP_STANDARD_B = 'ja-JP-Standard-B',
}

const googleClient = new googleTTS.TextToSpeechClient();

export type GoogleTTSExtras = GoogleTranslateExtras & {
  voiceName: GoogleTTSName;
};

export default class GoogleTTSProvider extends Provider {
  override extras: GoogleTTSExtras;
  constructor(sentence: string, extras: GoogleTTSExtras) {
    super(sentence, extras);
    this.extras = extras;
  }

  async createPayload(folderPath: string): Promise<Payload[]> {
    const request = {
      input: { text: this.sentence },
      voice: { languageCode: this.extras.lang, name: this.extras.voiceName },
      audioConfig: {
        audioEncoding: 2,
      },
    };
    const [response] = await googleClient.synthesizeSpeech(request);
    const fileName = createFileName('googleTTS');

    const filePath = path.join(folderPath, fileName);
    console.log(filePath);

    if (!response.audioContent) {
      throw new Error('no googleTTS audio content');
    }

    await fs.writeFile(filePath, response.audioContent, 'binary');
    console.log(filePath);
    return [new Payload(filePath, this.sentence)];
  }
}
