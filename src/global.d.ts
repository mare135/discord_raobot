/* eslint-disable no-var */
import { Client, Collection, Snowflake } from 'discord.js';
import ApplicationCommand from '../templates/ApplicationCommand';
import MessageCommand from '../templates/MessageCommand';
import type MemberInfo from './classes/MemberInfo';

interface DiscordClient extends Client {
  commands: Collection<string, ApplicationCommand>;
  msgCommands: Collection<string, MessageCommand>;
  memberInfos: Collection<Snowflake, MemberInfo>;
}

declare global {
  var client: DiscordClient;

  type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
}

export {};
