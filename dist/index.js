import 'dotenv/config';
import { Client, GatewayIntentBits, Collection, Partials, } from 'discord.js';
import { readdirSync } from 'fs';
import deployGlobalCommands from './deployGlobalCommands.js';
import { generateDependencyReport } from '@discordjs/voice';
const { TOKEN } = process.env;
await deployGlobalCommands();
global.client = Object.assign(new Client({
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
}), {
    commands: new Collection(),
    msgCommands: new Collection(),
    memberInfos: new Collection(),
    modals: new Collection(),
    guildVoiceControllers: new Collection(),
});
const commandFiles = readdirSync('./commands').filter((file) => file.endsWith('.js') || file.endsWith('.ts'));
for (const file of commandFiles) {
    const command = (await import(`./commands/${file}`))
        .default;
    client.commands.set(command.data.name, command);
}
const msgCommandFiles = readdirSync('./messageCommands').filter((file) => file.endsWith('.js') || file.endsWith('.ts'));
for (const file of msgCommandFiles) {
    const command = (await import(`./messageCommands/${file}`))
        .default;
    client.msgCommands.set(command.name, command);
}
const eventFiles = readdirSync('./events').filter((file) => file.endsWith('.js') || file.endsWith('.ts'));
for (const file of eventFiles) {
    const event = (await import(`./events/${file}`)).default;
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    }
    else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}
const modalFiles = readdirSync('./components/modals').filter((file) => file.endsWith('.js') || file.endsWith('.ts'));
for (const file of modalFiles) {
    const modal = (await import(`./components/modals/${file}`))
        .default;
    client.modals.set(modal.data.name, modal);
}
await client.login(TOKEN);
console.log(generateDependencyReport());
console.log(process.argv);
