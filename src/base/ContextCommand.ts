import type {
  ContextMenuCommandBuilder,
  UserContextMenuCommandInteraction,
} from 'discord.js';

export default class ContextCommand {
  data: ContextMenuCommandBuilder;
  execute: (...arg: any) => Promise<void> | void;

  constructor(object: {
    data: ContextMenuCommandBuilder;
    execute: (
      interaction: UserContextMenuCommandInteraction
    ) => Promise<void> | void;
  }) {
    this.data = object.data;
    this.execute = object.execute;
  }
}
