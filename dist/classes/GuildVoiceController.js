import { AudioPlayerStatus, createAudioResource, entersState, } from '@discordjs/voice';
import path from 'path';
import { createTempString } from '../functions/utils.js';
import fs from 'fs';
export default class GuildVoiceController {
    guildId;
    voiceChannel;
    textChannel;
    voiceManager;
    voiceQueue;
    isSpeaking;
    folderPath;
    constructor(guildId, voiceChannel, textChannel, voiceManager) {
        this.guildId = guildId;
        this.voiceChannel = voiceChannel;
        this.textChannel = textChannel;
        this.voiceManager = voiceManager;
        this.voiceQueue = [];
        this.isSpeaking = false;
        const __dirname = path.resolve();
        this.folderPath = path.join(__dirname, '..', 'resources');
        if (!fs.existsSync(this.folderPath)) {
            fs.mkdirSync(this.folderPath);
        }
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
        });
        this.voiceManager.player.on('error', (error) => {
            this.isSpeaking = false;
            console.log('audio player error');
            console.log(error);
        });
        this.voiceManager.player.on('stateChange', (oldState, newState) => {
            console.log(`audio player transitioned from ${oldState.status} to ${newState.status}`);
        });
    }
    async play() {
        const payload = this.voiceQueue.shift();
        if (!payload)
            return;
        const audioResource = createAudioResource(payload.resource, {
            metadata: {
                title: payload.sentence,
            },
        });
        this.isSpeaking = true;
        console.log('playing : ' + payload.sentence);
        this.voiceManager.play(audioResource);
        try {
            await entersState(this.voiceManager.player, AudioPlayerStatus.Playing, 5_000);
        }
        catch (error) {
            console.log('play method error : ');
            console.log(error);
        }
        console.log();
    }
    async push(payload) {
        console.log('push this.isspeaking :' + String(this.isSpeaking));
        this.voiceQueue.push(payload);
        if (this.isSpeaking === false) {
            await this.play();
        }
        try {
            await entersState(this.voiceManager.player, AudioPlayerStatus.Playing, 3_000);
        }
        catch (error) {
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
