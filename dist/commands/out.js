import { getVoiceConnection } from '@discordjs/voice';
import { SlashCommandBuilder } from 'discord.js';
import ApplicationCommand from '../base/ApplicationCommand.js';
export default new ApplicationCommand({
    data: new SlashCommandBuilder()
        .setName('out')
        .setDescription('BOTをVCから落とす'),
    async execute(interaction) {
        const guildId = interaction.guildId;
        if (!guildId)
            return;
        const voiceChannel = interaction.member?.voice
            .channel;
        if (!voiceChannel) {
            await interaction.reply({
                content: 'VCに入ってからコマンドを入力してください',
            });
            return;
        }
        const connection = getVoiceConnection(guildId);
        if (!connection) {
            await interaction.reply({
                content: 'BOTが入ってません',
            });
            return;
        }
        connection.destroy();
        client.guildVoiceControllers.delete(guildId);
        await interaction.reply({
            content: 'Bot disconnected',
        });
    },
});
