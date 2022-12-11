import { ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionFlagsBits, SlashCommandBuilder, } from 'discord.js';
import ApplicationCommand from '../base/ApplicationCommand.js';
export default new ApplicationCommand({
    data: new SlashCommandBuilder()
        .setName('make-change-title-button')
        .setDescription('VC SET')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const changeTitleBtn = new ButtonBuilder()
            .setCustomId('change-title')
            .setLabel('VC タイトル変更')
            .setStyle(ButtonStyle.Primary);
        const changeUserLimitBtn = new ButtonBuilder()
            .setCustomId('change-user-limit')
            .setLabel('人数変更')
            .setStyle(ButtonStyle.Success);
        await interaction.reply({
            content: 'making change VC title Btn Success',
        });
        await interaction.deleteReply();
        if (!interaction.channel)
            return;
        await interaction.channel.send({
            components: [
                new ActionRowBuilder().addComponents(changeTitleBtn, changeUserLimitBtn),
            ],
        });
    },
});
