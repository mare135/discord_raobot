import {
  ApplicationCommandType,
  ContextMenuCommandBuilder,
  TextBasedChannel,
  UserContextMenuCommandInteraction,
} from 'discord.js';
import ContextCommand from '../base/ContextCommand.js';

export default new ContextCommand({
  data: new ContextMenuCommandBuilder()
    .setName('アイコン確認')
    .setType(ApplicationCommandType.User),

  async execute(interaction: UserContextMenuCommandInteraction): Promise<void> {
    const logChannel = client.channels.cache.get(
      '716963970560426004'
    ) as TextBasedChannel;

    if (!logChannel) {
      await interaction.reply('no log channel');
      return;
    }

    await logChannel.send({
      content: `${interaction.targetUser.displayAvatarURL()}`,
    });
  },
});
