import Payload from '../Payload.js';
import { Provider } from './Provider.js';
import googleTTS from '@google-cloud/text-to-speech';
import { createFileName } from '../../functions/utils.js';
import fs from 'fs/promises';
import path from 'path';
export var GoogleTTSName;
(function (GoogleTTSName) {
    GoogleTTSName["KR_STANDARD_A"] = "ko-KR-Standard-A";
    GoogleTTSName["JP_STANDARD_B"] = "ja-JP-Standard-B";
})(GoogleTTSName || (GoogleTTSName = {}));
const googleClient = new googleTTS.TextToSpeechClient();
export default class GoogleTTSProvider extends Provider {
    extras;
    constructor(sentence, extras) {
        super(sentence, extras);
        this.extras = extras;
    }
    async createPayload(folderPath) {
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
