import { SlashCommandBuilder, userMention } from 'discord.js';
import ApplicationCommand from '../base/ApplicationCommand.js';
export default new ApplicationCommand({
    data: new SlashCommandBuilder()
        .setName('rank')
        .setDescription('ランキング確認'),
    async execute(interaction) {
        if (client.memberInfos.size < 1) {
            await interaction.reply('no points');
            return;
        }
        client.memberInfos.sort((a, b) => b.point - a.point);
        let resultStr = '';
        let index = 1;
        for (const memberInfo of client.memberInfos) {
            resultStr += `${index++}位：${userMention(memberInfo[0])} (${memberInfo[1].point}ポイント)\n`;
        }
        await interaction.reply(resultStr);
    },
});
