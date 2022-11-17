import {
  AudioPlayerStatus,
  createAudioResource,
  entersState,
} from '@discordjs/voice';
import type { TextBasedChannel, VoiceBasedChannel } from 'discord.js';
import type Payload from './Payload';
import type { VoiceManager } from './VoiceManager';

export default class GuildVoiceController {
  voiceChannel: VoiceBasedChannel;
  textChannel: TextBasedChannel;
  voiceManager: VoiceManager;
  voiceQueue: Payload[];
  isSpeaking: boolean;

  constructor(
    voiceChannel: VoiceBasedChannel,
    textChannel: TextBasedChannel,
    voiceManager: VoiceManager
  ) {
    this.voiceChannel = voiceChannel;
    this.textChannel = textChannel;
    this.voiceManager = voiceManager;
    this.voiceQueue = [];
    this.isSpeaking = false;

    this.voiceManager.player.on(AudioPlayerStatus.Idle, () => {
      this.isSpeaking = false;
      if (this.voiceQueue.length > 0) {
        this.play().catch((error) => {
          console.log(error);
        });
      }
    });

    this.voiceManager.player.on(AudioPlayerStatus.AutoPaused, () => {
      console.log('autopaused');
      // this.voiceManager.resubscribe();
    });

    this.voiceManager.player.on('error', (error) => {
      this.isSpeaking = false;
      console.log('audio player error');
      console.log(error);
    });

    this.voiceManager.player.on('stateChange', (oldState, newState) => {
      console.log(
        `audio player transitioned from ${oldState.status} to ${newState.status}`
      );
    });
  }

  async play() {
    const payload = this.voiceQueue.shift();
    if (!payload) return;

    const audioResource = createAudioResource(payload.resource, {
      metadata: {
        title: payload.sentence,
      },
    });
    this.isSpeaking = true;
    console.log('playing : ' + payload.sentence);
    this.voiceManager.play(audioResource);
    try {
      await entersState(
        this.voiceManager.player,
        AudioPlayerStatus.Playing,
        5_000
      );
    } catch (error) {
      console.log('play method error : ');
      console.log(error);
    }
    console.log();
  }

  async push(payload: Payload) {
    console.log('push this.isspeaking :' + String(this.isSpeaking));
    this.voiceQueue.push(payload);
    if (this.isSpeaking === false) {
      await this.play();
    }
    try {
      await entersState(
        this.voiceManager.player,
        AudioPlayerStatus.Playing,
        3_000
      );
    } catch (error) {
      console.log('push method catch error : ' + String(error));
      await this.play();
    }
  }
}
