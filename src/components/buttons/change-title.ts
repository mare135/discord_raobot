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
    name: 'change-title',
  },
  async execute(interaction: ButtonInteraction) {
    const modal = new ModalBuilder()
      .setCustomId('title-modal')
      .setTitle('VC タイトル変更');

    const textInput = new TextInputBuilder()
      .setCustomId('title-modal-input')
      .setLabel('タイトルを入力してください。')
      .setRequired(true)
      .setStyle(TextInputStyle.Short);
    modal.addComponents(
      new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
        textInput
      )
    );

    await interaction.showModal(modal);
  },
});
