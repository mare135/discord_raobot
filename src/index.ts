/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import 'dotenv/config';

import {
  Client,
  GatewayIntentBits,
  Collection,
  Partials,
  Snowflake,
} from 'discord.js';
import { readdirSync } from 'fs';
import type ApplicationCommand from './base/ApplicationCommand.js';
import type Event from './base/Event.js';
import type MessageCommand from './base/MessageCommand.js';
import deployGlobalCommands from './deployGlobalCommands.js';
import type MemberInfo from './classes/MemberInfo.js';
import type ModalComponent from './base/ModalComponent.js';
import type GuildVoiceController from './classes/GuildVoiceController.js';
import { generateDependencyReport } from '@discordjs/voice';

const { TOKEN } = process.env;

await deployGlobalCommands();

// Discord client object
global.client = Object.assign(
  new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMembers,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildVoiceStates,
      GatewayIntentBits.GuildIntegrations,
      GatewayIntentBits.DirectMessages,
    ],
    partials: [Partials.Channel],
  }),
  {
    commands: new Collection<string, ApplicationCommand>(),
    msgCommands: new Collection<string, MessageCommand>(),
    memberInfos: new Collection<Snowflake, MemberInfo>(),
    modals: new Collection<string, ModalComponent>(),
    guildVoiceControllers: new Collection<Snowflake, GuildVoiceController>(),
  }
);

// Set each command in the commands folder as a command in the client.commands collection
const commandFiles: string[] = readdirSync('./commands').filter(
  (file) => file.endsWith('.js') || file.endsWith('.ts')
);
for (const file of commandFiles) {
  const command: ApplicationCommand = (await import(`./commands/${file}`))
    .default as ApplicationCommand;
  client.commands.set(command.data.name, command);
}

const msgCommandFiles: string[] = readdirSync('./messageCommands').filter(
  (file) => file.endsWith('.js') || file.endsWith('.ts')
);
for (const file of msgCommandFiles) {
  const command: MessageCommand = (await import(`./messageCommands/${file}`))
    .default as MessageCommand;
  client.msgCommands.set(command.name, command);
}

// Event handling
const eventFiles: string[] = readdirSync('./events').filter(
  (file) => file.endsWith('.js') || file.endsWith('.ts')
);

for (const file of eventFiles) {
  const event: Event = (await import(`./events/${file}`)).default as Event;
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// Event handling
const modalFiles: string[] = readdirSync('./components/modals').filter(
  (file) => file.endsWith('.js') || file.endsWith('.ts')
);

for (const file of modalFiles) {
  const modal: ModalComponent = (await import(`./components/modals/${file}`))
    .default as ModalComponent;
  client.modals.set(modal.data.name, modal);
}

await client.login(TOKEN);

console.log(generateDependencyReport());
console.log(process.argv);
