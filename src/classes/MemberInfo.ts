import type { Snowflake } from 'discord.js';

export default class MemberInfo {
  id: Snowflake;
  point: number;

  constructor(id: Snowflake, point: number) {
    this.id = id;
    this.point = point;
  }
  add(num: number): void {
    this.point += num;
  }
}
