import { entersState, getVoiceConnection, joinVoiceChannel, VoiceConnectionStatus, createAudioPlayer, NoSubscriberBehavior, } from '@discordjs/voice';
export class VoiceManager {
    guild;
    player;
    readyLock;
    channel;
    constructor(guild, options = {}) {
        this.guild = guild;
        this.player =
            options.Audioplayer ||
                createAudioPlayer({
                    behaviors: {
                        noSubscriber: NoSubscriberBehavior.Stop,
                    },
                });
        this.readyLock = false;
    }
    connect(channel) {
        this.channel = channel;
        return new Promise((resolve) => {
            const connection = joinVoiceChannel({
                channelId: channel.id,
                guildId: this.guild.id,
                adapterCreator: this.guild
                    .voiceAdapterCreator,
                selfDeaf: false,
                selfMute: false,
            });
            connection.on('stateChange', (oldState, newState) => {
                console.log(`Connection transitioned from ${oldState.status} to ${newState.status}`);
            });
            connection.on(VoiceConnectionStatus.Ready, () => {
                console.log('Ready');
                connection.subscribe(this.player);
                return resolve(this);
            });
            connection.on(VoiceConnectionStatus.Disconnected, () => {
                Promise.race([
                    entersState(connection, VoiceConnectionStatus.Signalling, 5000),
                    entersState(connection, VoiceConnectionStatus.Connecting, 5000),
                ]).catch((error) => {
                    console.log('disconnected error');
                    console.log(error);
                    this.disconnect();
                });
            });
            connection.on(VoiceConnectionStatus.Signalling, (oldState) => {
                if (oldState.status === VoiceConnectionStatus.Connecting ||
                    oldState.status === VoiceConnectionStatus.Ready) {
                    entersState(connection, VoiceConnectionStatus.Ready, 5_000).catch(async (error) => {
                        console.log('Signalling connect error, reconnect!');
                        console.log(error);
                        this.disconnect();
                        await this.connect(channel);
                    });
                }
            });
            connection.on(VoiceConnectionStatus.Connecting, () => {
                entersState(connection, VoiceConnectionStatus.Ready, 5_000).catch(async (error) => {
                    console.log('Connecting connect error, reconnect!');
                    console.log(error);
                    this.disconnect();
                    await this.connect(channel);
                });
            });
        });
    }
    resubscribe() {
        const current = this.getConnection();
        if (current) {
            console.log('connection alived');
            current.subscribe(this.player);
        }
    }
    disconnect() {
        const connection = this.getConnection();
        if (connection) {
            connection.destroy();
        }
    }
    getConnection() {
        return getVoiceConnection(this.guild.id);
    }
    play(resource) {
        this.player.play(resource);
    }
}
