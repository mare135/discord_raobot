import { REST } from '@discordjs/rest';
import { Routes } from 'discord.js';
import { readdirSync } from 'fs';
import { ProductName } from './base/Const.js';
const { TOKEN, CLIENT_ID, DEFAULT_GUILD_ID } = process.env;
export default async function deployGlobalCommands() {
    const commands = [];
    const voiceCommandFiles = readdirSync('./voiceCommands').filter((file) => file.endsWith('.js') || file.endsWith('.ts'));
    for (const file of voiceCommandFiles) {
        const command = (await import(`./voiceCommands/${file}`)).default;
        const commandData = command.data.toJSON();
        commands.push(commandData);
    }
    if (productName === ProductName.RAO) {
        const commandFiles = readdirSync('./commands').filter((file) => file.endsWith('.js') || file.endsWith('.ts'));
        for (const file of commandFiles) {
            const command = (await import(`./commands/${file}`))
                .default;
            const commandData = command.data.toJSON();
            commands.push(commandData);
        }
    }
    const rest = new REST({ version: '10' }).setToken(TOKEN);
    try {
        console.log('Started deleting application (/) commands.');
        await rest.put(Routes.applicationGuildCommands(CLIENT_ID, DEFAULT_GUILD_ID), {
            body: [],
        });
        console.log('Successfully deleted all guild commands.');
        console.log('DE : Started refreshing application (/) commands.');
        await rest.put(Routes.applicationCommands(CLIENT_ID), {
            body: commands,
        });
        console.log('Successfully reloaded application (/) commands.');
    }
    catch (error) {
        console.error(error);
    }
}
