import {
  Message,
  SlashCommandBuilder,
  Snowflake,
  userMention,
} from 'discord.js';
import MemberInfo from '../classes/MemberInfo.js';
import ApplicationCommand from '../templates/ApplicationCommand.js';

export default new ApplicationCommand({
  data: new SlashCommandBuilder()
    .setName('quiz')
    .setDescription('quiz set')
    .addStringOption((option) =>
      option.setName('answer').setDescription('正解').setRequired(true)
    )
    .addNumberOption((option) =>
      option.setName('timelimit').setDescription('制限時間').setRequired(true)
    )
    .addNumberOption((option) =>
      option.setName('point').setDescription('ポイント').setRequired(true)
    ),
  async execute(interaction): Promise<void> {
    const { data } = interaction.options;
    const answer = data[0]?.value as string;
    const timeLimit = (data[1]?.value as number) * 1000;
    const point = data[2]?.value as number;
    const { memberInfos } = client;

    console.log(`${answer} and ${timeLimit}`);

    if (!answer) {
      await interaction.reply('no answer');
      return;
    }

    const filter = (m: Message) =>
      m.content.toLowerCase().includes(answer.toLowerCase());

    await interaction.reply({
      content: '正解を書いてください',
      fetchReply: true,
    });
    try {
      const collected = await interaction.channel?.awaitMessages({
        filter,
        time: timeLimit,
      });

      await interaction.followUp('時間制限終了');

      if (collected?.size == 0) {
        await interaction.followUp('返信してません');
      }
      if (!collected?.first()) return;

      console.log(Array.from(collected.values()));

      const members = new Set<Snowflake>();
      for (const message of Array.from(collected.values())) {
        members.add(message.author.id);
      }
      console.log(members);

      let correntPeopleText = `正解を当てた人（${point}点獲得!)：\n`;

      for (const member of members.keys()) {
        correntPeopleText += `${userMention(member)}  `;
        if (!memberInfos.has(member)) {
          memberInfos.set(member, new MemberInfo(member, point));
        } else {
          memberInfos.get(member)?.add(point);
        }
      }
      await interaction.followUp(correntPeopleText);
    } catch (e) {
      console.log(e);
    }
  },
});
