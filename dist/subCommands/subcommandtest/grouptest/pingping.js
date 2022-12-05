import SubCommand from '../../../base/SubCommand.js';
export default new SubCommand({
    async execute(interaction) {
        await interaction.reply('PongPong!');
    },
});
