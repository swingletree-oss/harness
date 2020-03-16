import * as yaml from "js-yaml";
import { LOGGER } from "./logger";
import * as nconf from "nconf";

export class Configuration {
  private config: nconf.Provider;

  /** Constructs a default Configuration wrapper for Swingletree yaml configurations
   *
   * @param file configuration yaml to read
   * @param envVarMatcher environment variable whitelist. Matching env vars will be evaluated.
   */
  constructor(file = "./swingletree.conf.yaml", envVarMatcher: RegExp) {
    LOGGER.info("loading configuration from file %s", file);

    this.config = new nconf.Provider()
      .env({
        lowerCase: true,
        separator: "_",
        match: envVarMatcher
      })
      .file({
        file: file,
        format: {
          parse: yaml.safeLoad,
          stringify: yaml.safeDump
        }
      });
  }

  public checkRequired(keys: string[]) {
    this.config.required(keys);
  }

  public get(key: string): string {
    const value: string = this.config.get(key);

    if (!value || value.toString().trim() == "") {
      return null;
    }

    return value;
  }

  public set(key: string, value: any) {
    LOGGER.info("overwriting configuration property %s", key);
    this.config.set(key, value);
  }

  public getObject<T>(key: string): T {
    return this.config.get(key);
  }

  public getConfig() {
    return this.config.get();
  }

  public getNumber(key: string): number {
    return Number(this.get(key));
  }

  public getBoolean(key: string): boolean {
    return String(this.get(key)) == "true";
  }
}
