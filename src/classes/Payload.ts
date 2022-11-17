export default class Payload {
  resource: string;
  sentence: string;
  constructor(resource: string, sentence: string) {
    this.resource = resource;
    this.sentence = sentence;
  }
}
