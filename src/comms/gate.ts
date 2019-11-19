import { Harness } from "../model";
import { WithMetaMessage } from "./message";

/** Report Data sent by Gate to a specific plugin */
export interface PluginReportProcessData<D> {
  /** Swingletree Headers received by Gate */
  headers: Map<string, string>;
  /** report received by Gate */
  report: D;
}

export interface PluginReportProcessMetadata {
  /** scm source information */
  source: Harness.ScmSource;
  /** uuid of the build */
  buildUuid: string;
}

export class PluginReportProcessRequest<D extends Object> implements WithMetaMessage<PluginReportProcessData<D>, PluginReportProcessMetadata> {
  data: PluginReportProcessData<D>;
  meta: PluginReportProcessMetadata;

  constructor(data: PluginReportProcessData<D>, meta?: PluginReportProcessMetadata) {
    this.data = data;
    this.meta = meta;
  }
}