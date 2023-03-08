/* eslint-disable no-var */
import { Client, Collection, Snowflake } from 'discord.js';
import ApplicationCommand from '../templates/ApplicationCommand';
import MessageCommand from '../templates/MessageCommand';
import type GuildVoiceController from './classes/GuildVoiceController';
import type MemberInfo from './classes/MemberInfo';
import type ModalComponent from './base/ModalComponent';
import BaseButtonComponent from './base/ButtonComponent';

interface DiscordClient extends Client {
  commands: Collection<string, ApplicationCommand>;
  msgCommands: Collection<string, MessageCommand>;
  memberInfos: Collection<Snowflake, MemberInfo>;
  modals: Collection<string, ModalComponent>;
  buttons: Collection<string, BaseButtonComponent>;
  guildVoiceControllers: Collection<Snowflake, GuildVoiceController>;
}

export enum ProductName {
  RAO = 'RAO',
  SHABERUKO = 'SHABERUKO',
  SHABERUUSA = 'SHABERUUSA',
}

declare global {
  var client: DiscordClient;
  var productName: ProductName;

  type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
}

export {};
