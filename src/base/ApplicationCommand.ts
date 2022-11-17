/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type {
  ChatInputCommandInteraction,
  ContextMenuCommandBuilder,
  SlashCommandBuilder,
  SlashCommandSubcommandsOnlyBuilder,
} from 'discord.js';

/**
 * Represents an Application Command
 */
export default class ApplicationCommand {
  data:
    | SlashCommandBuilder
    | ContextMenuCommandBuilder
    | SlashCommandSubcommandsOnlyBuilder
    | Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>;
  hasSubCommands: boolean;
  execute: (interaction: ChatInputCommandInteraction) => Promise<void> | void;

  /**
   * @param {{
   *      data: SlashCommandBuilder | ContextMenuCommandBuilder | SlashCommandSubcommandsOnlyBuilder | Omit<SlashCommandBuilder, "addSubcommand" | "addSubcommandGroup">
   *      hasSubCommands?: boolean
   *      execute?: (interaction: ChatInputCommandInteraction) => Promise<void> | void
   *  }} options - The options for the slash command
   */
  constructor(options: {
    data:
      | SlashCommandBuilder
      | ContextMenuCommandBuilder
      | SlashCommandSubcommandsOnlyBuilder
      | Omit<SlashCommandBuilder, 'addSubcommand' | 'addSubcommandGroup'>;
    hasSubCommands?: boolean;
    execute: (interaction: ChatInputCommandInteraction) => Promise<void> | void;
  }) {
    this.execute = options.execute;
    this.data = options.data;
    this.hasSubCommands = options.hasSubCommands ?? false;
  }
}
