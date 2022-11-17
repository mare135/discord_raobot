export type ProviderExtras = {
  lang: string;
};

export abstract class Provider {
  sentence: string;
  extras: ProviderExtras;
  constructor(sentence: string, extras: ProviderExtras) {
    this.sentence = sentence;
    this.extras = extras;
  }
}
