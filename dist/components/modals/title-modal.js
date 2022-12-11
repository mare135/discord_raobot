import { userMention, } from 'discord.js';
import ModalComponent from '../../base/ModalComponent.js';
import { setTimeout } from 'node:timers/promises';
export default new ModalComponent({
    data: {
        name: 'title-modal',
    },
    async execute(interaction) {
        try {
            const newTitle = interaction.fields.getTextInputValue('title-modal-input');
            if (!interaction.member)
                return;
            const member = interaction.member;
            const voiceChannel = member.voice.channel;
            if (!voiceChannel) {
                await interaction.reply('VCに参加してください。');
                return;
            }
            const newChannel = await voiceChannel.setName(newTitle);
            const logChannel = client.channels.cache.get('898098132519374868');
            if (!logChannel) {
                await interaction.reply('no log channel');
                return;
            }
            await logChannel.send({
                content: `${userMention(member.id)}タイトル変更：${newChannel.name}`,
            });
            await interaction.deferReply();
            await interaction.deleteReply();
        }
        catch (error) {
            console.log('問題発生');
            console.log(error);
            await interaction.reply({
                content: '問題が発生しました！',
            });
            await setTimeout(1000);
            await interaction.deleteReply();
        }
    },
});
