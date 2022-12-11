import type { ButtonInteraction } from 'discord.js';

type ButtonData = {
  name: string;
};
export default class BaseButtonComponent {
  data: ButtonData;
  execute: (interaction: ButtonInteraction) => Promise<void> | void;

  constructor(object: {
    data: ButtonData;
    execute: (interaction: ButtonInteraction) => Promise<void> | void;
  }) {
    this.data = object.data;
    this.execute = object.execute;
  }
}
