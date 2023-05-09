import {
  AudioPlayerStatus,
  createAudioResource,
  entersState,
} from '@discordjs/voice';
import { Snowflake, TextBasedChannel, VoiceBasedChannel } from 'discord.js';
import type Payload from './Payload';
import type { VoiceManager } from './VoiceManager';
import path from 'path';
import { createTempString } from '../functions/utils.js';
import fs from 'fs';

export default class GuildVoiceController {
  guildId: Snowflake;
  voiceChannel: VoiceBasedChannel;
  textChannel: TextBasedChannel;
  voiceManager: VoiceManager;
  voiceQueue: Payload[];
  isSpeaking: boolean;
  folderPath: string;

  constructor(
    guildId: Snowflake,
    voiceChannel: VoiceBasedChannel,
    textChannel: TextBasedChannel,
    voiceManager: VoiceManager
  ) {
    this.guildId = guildId;
    this.voiceChannel = voiceChannel;
    this.textChannel = textChannel;
    this.voiceManager = voiceManager;
    this.voiceQueue = [];
    this.isSpeaking = false;

    const __dirname = path.resolve();

    this.folderPath = path.join(__dirname, '..', 'resources');

    // make resource folder

    // if there is resource no directory
    if (!fs.existsSync(this.folderPath)) {
      fs.mkdirSync(this.folderPath);
    }

    // make temp directory
    this.folderPath = path.join(this.folderPath, createTempString());
    fs.mkdirSync(this.folderPath);

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

    try {
      this.voiceManager.play(audioResource);
    } catch (error) {
      console.log('catch ERROR');
      console.log(error);
    }
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

  delete() {
    fs.rm(this.folderPath, { recursive: true, force: true }, (error) => {
      if (error === null) {
        return;
      }
      console.log('folder delete error', error);
    });
    client.guildVoiceControllers.delete(this.guildId);
  }
}
