type dataType = {
  name: string;
};
export default abstract class DefaultComponent {
  data: dataType;
  execute: (...arg: any) => Promise<void> | void;

  constructor(object: {
    data: dataType;
    execute: (...args: any) => Promise<void> | void;
  }) {
    this.data = object.data;
    this.execute = object.execute;
  }
}
