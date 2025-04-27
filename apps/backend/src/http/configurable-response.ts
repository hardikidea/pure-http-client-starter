export default class ConfigurableResponses<T> {
  private description: string;
  private responses: T | Array<T>;

  static create<T>(responses: T | Array<T>, name?: string): ConfigurableResponses<T> {
    return new ConfigurableResponses(responses, name);
  }

  static mapObject<T>(
    responseObject: Record<string, T>,
    name?: string,
  ): Record<string, ConfigurableResponses<T>> {
    const entries = Object.entries(responseObject);
    const translatedEntries = entries.map(([key, value]) => {
      const translatedName = name === undefined ? undefined : `${name}: ${key}`;
      return [key, ConfigurableResponses.create(value, translatedName)];
    });
    return Object.fromEntries(translatedEntries);
  }

  constructor(responses: T | Array<T>, name?: string) {
    this.description = name === undefined ? '' : ` in ${name}`;
    this.responses = Array.isArray(responses) ? [...responses] : responses;
  }

  next(): T {
    const response = Array.isArray(this.responses) ? this.responses.shift() : this.responses;

    if (response === undefined) {
      throw new Error(`No more responses configured${this.description}`);
    }

    return response;
  }
}
