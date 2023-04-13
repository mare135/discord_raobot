import 'dotenv/config';
import { Client, GatewayIntentBits, Collection, Partials, } from 'discord.js';
import { readdirSync } from 'fs';
import deployGlobalCommands from './deployGlobalCommands.js';
import { generateDependencyReport } from '@discordjs/voice';
import { ProductName } from './base/Const.js';
const { TOKEN } = process.env;
global.productName = process.env.PRODUCT_NAME;
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
    buttons: new Collection(),
    guildVoiceControllers: new Collection(),
});
const voiceCommandFiles = readdirSync('./voiceCommands').filter((file) => file.endsWith('.js') || file.endsWith('.ts'));
for (const file of voiceCommandFiles) {
    const command = (await import(`./voiceCommands/${file}`))
        .default;
    client.commands.set(command.data.name, command);
}
if (productName === ProductName.RAO) {
    console.log('PRODUCT NAME : ' + ProductName.RAO);
    const commandFiles = readdirSync('./commands').filter((file) => file.endsWith('.js') || file.endsWith('.ts'));
    for (const file of commandFiles) {
        const command = (await import(`./commands/${file}`))
            .default;
        client.commands.set(command.data.name, command);
    }
}
console.log(client.commands);
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
const buttonFiles = readdirSync('./components/buttons').filter((file) => file.endsWith('.js') || file.endsWith('.ts'));
for (const file of buttonFiles) {
    const button = (await import(`./components/buttons/${file}`)).default;
    client.buttons.set(button.data.name, button);
}
await client.login(TOKEN);
console.log(generateDependencyReport());
console.log(process.argv);
