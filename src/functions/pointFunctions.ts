import type { Snowflake } from 'discord.js';
import MemberInfo from '../classes/MemberInfo.js';

export const giveUserPoint = (userId: Snowflake, point: number) => {
  console.log(`giveUserPoint userId:${userId} point:${point}`);
  const { memberInfos } = client;
  if (!memberInfos.has(userId)) {
    memberInfos.set(userId, new MemberInfo(userId, point));
  } else {
    memberInfos.get(userId)?.add(point);
  }
};
