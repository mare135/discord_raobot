import { ActionRowBuilder, ApplicationCommandType, ContextMenuCommandBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, } from 'discord.js';
import ContextCommand from '../base/ContextCommand.js';
export default new ContextCommand({
    data: new ContextMenuCommandBuilder()
        .setName('give point')
        .setType(ApplicationCommandType.User),
    async execute(interaction) {
        const givePointModal = new ModalBuilder()
            .setCustomId('pointModal')
            .setTitle('ポイントを与えます');
        const userInput = new TextInputBuilder()
            .setCustomId('userIdInput')
            .setLabel('この値は変えないでください')
            .setValue(interaction.targetUser.id)
            .setStyle(TextInputStyle.Short);
        const pointInput = new TextInputBuilder()
            .setCustomId('pointInput')
            .setLabel('与えるポイント')
            .setStyle(TextInputStyle.Short);
        const firstActionRow = new ActionRowBuilder().addComponents(userInput);
        const secondActionRow = new ActionRowBuilder().addComponents(pointInput);
        givePointModal.addComponents(firstActionRow, secondActionRow);
        console.log('givepoint!');
        await interaction.showModal(givePointModal);
    },
});
