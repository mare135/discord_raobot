import type { ModalSubmitInteraction } from 'discord.js';

type ModalData = {
  name: string;
};
export default class ModalComponent {
  data: ModalData;
  execute: (interaction: ModalSubmitInteraction) => Promise<void> | void;

  constructor(object: {
    data: ModalData;
    execute: (interaction: ModalSubmitInteraction) => Promise<void> | void;
  }) {
    this.data = object.data;
    this.execute = object.execute;
  }
}
