import {
  ActionRowBuilder,
  ButtonInteraction,
  ModalActionRowComponentBuilder,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} from 'discord.js';
import BaseButtonComponent from '../../base/ButtonComponent.js';

export default new BaseButtonComponent({
  data: {
    name: 'change-user-limit',
  },
  async execute(interaction: ButtonInteraction) {
    const modal = new ModalBuilder()
      .setCustomId('user-limit-modal')
      .setTitle('VC人数変更');

    const textInput = new TextInputBuilder()
      .setCustomId('user-limit-input')
      .setLabel('VC人数を入力してください')
      .setRequired(true)
      .setStyle(TextInputStyle.Short)
      .setMaxLength(2);
    modal.addComponents(
      new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
        textInput
      )
    );

    await interaction.showModal(modal);
  },
});
