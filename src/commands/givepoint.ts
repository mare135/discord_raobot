import {
  ActionRowBuilder,
  ApplicationCommandType,
  ContextMenuCommandBuilder,
  ModalActionRowComponentBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';
import ApplicationCommand from '../templates/ApplicationCommand.js';

export default new ApplicationCommand({
  data: new ContextMenuCommandBuilder()
    .setName('give point')
    .setType(ApplicationCommandType.User),

  async execute(interaction): Promise<void> {
    const givePointModal = new ModalBuilder()
      .setCustomId('pointModal')
      .setTitle('ポイントを与えます');

    const pointInput = new TextInputBuilder()
      .setCustomId('pointInput')
      .setLabel('与えるポイント')
      .setStyle(TextInputStyle.Short);

    const actionRow =
      new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
        pointInput
      );

    givePointModal.addComponents(actionRow);
    console.log('givepoint!');

    await interaction.showModal(givePointModal);
  },
});
