import { SlashCommandBuilder, userMention } from 'discord.js';
import { giveUserPoint } from '../functions/pointFunctions.js';
import ApplicationCommand from '../base/ApplicationCommand.js';
export default new ApplicationCommand({
    data: new SlashCommandBuilder()
        .setName('point')
        .setDescription('give player point')
        .addMentionableOption((option) => option
        .setName('user')
        .setDescription('点数を付けるユーザーを選んでください。')
        .setRequired(true))
        .addNumberOption((option) => option.setName('point').setDescription('点数').setRequired(true)),
    async execute(interaction) {
        const { data } = interaction.options;
        if (!data) {
            await interaction.reply('no data error');
            return;
        }
        if (!data[0]?.value || !data[1]?.value) {
            await interaction.reply('no value error');
            return;
        }
        const targetId = data[0].value;
        const point = data[1].value;
        giveUserPoint(targetId, point);
        await interaction.reply(`${userMention(targetId)} : ${point}ポイント獲得！（現在：${String(client.memberInfos.get(targetId)?.point)}ポイント）`);
    },
});
