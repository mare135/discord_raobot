import type { ButtonInteraction, ModalSubmitInteraction } from 'discord.js';

type ComponentData = {
  name: string;
};
type ComponentInteraction = ModalSubmitInteraction | ButtonInteraction;

export default abstract class BaseComponent {
  data: ComponentData;
  execute: (interaction: ComponentInteraction) => Promise<void> | void;

  constructor(object: {
    data: ComponentData;
    execute: (interaction: ComponentInteraction) => Promise<void> | void;
  }) {
    this.data = object.data;
    this.execute = object.execute;
  }
}
