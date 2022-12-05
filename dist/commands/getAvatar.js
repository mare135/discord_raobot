import { ApplicationCommandType, ContextMenuCommandBuilder, } from 'discord.js';
import ContextCommand from '../base/ContextCommand.js';
export default new ContextCommand({
    data: new ContextMenuCommandBuilder()
        .setName('アイコン確認')
        .setType(ApplicationCommandType.User),
    async execute(interaction) {
        await interaction.reply({
            content: `${interaction.targetUser.displayAvatarURL()}`,
        });
    },
});
