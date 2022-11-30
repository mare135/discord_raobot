import Event from '../base/Event.js';
import { Events, Message } from 'discord.js';
import { detectLanguage } from '../functions/detectLanguage.js';
import GoogleTTSProvider, {
  GoogleTTSName,
} from '../classes/providers/GoogleTTSProvider.js';
import { GoogleTranslateLanguage } from '../classes/providers/GoogleTranslateTTSProvider.js';

export default new Event({
  name: Events.MessageCreate,
  async execute(message: Message): Promise<void> {
    if (message.author.bot) return;
    if (!message.guildId) return;

    const guildVoiceController = client.guildVoiceControllers.get(
      message.guildId
    );
    if (!guildVoiceController) return;

    if (guildVoiceController.textChannel.id === message.channelId) {
      const detectedLanguageCode = await detectLanguage(message.content);

      let lang: GoogleTranslateLanguage;
      let voiceName: GoogleTTSName;
      if (detectedLanguageCode === 'ko') {
        lang = GoogleTranslateLanguage.KOREAN;
        voiceName = GoogleTTSName.KR_STANDARD_A;
      } else {
        lang = GoogleTranslateLanguage.JAPANESE;
        voiceName = GoogleTTSName.JP_STANDARD_B;
      }

      const payloads = await new GoogleTTSProvider(message.content, {
        lang: lang,
        voiceName: voiceName,
      }).createPayload(guildVoiceController.folderPath);

      payloads.forEach((payload) => {
        guildVoiceController.push(payload).catch((e) => console.log(e));
      });
    }
  },
});
