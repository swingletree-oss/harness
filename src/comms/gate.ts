import { Harness } from "../model";
import { WithMetaMessage } from "./message";

export interface PluginReportProcessData<D> {
  headers: Map<string, string>;
  report: D;
}

export interface PluginReportProcessMetadata {
  source: Harness.ScmSource;
}

export class PluginReportProcessRequest<D extends Object> implements WithMetaMessage<PluginReportProcessData<D>, PluginReportProcessMetadata> {
  data: PluginReportProcessData<D>;
  meta: PluginReportProcessMetadata;

  constructor(data: PluginReportProcessData<D>, meta?: PluginReportProcessMetadata) {
    this.data = data;
    this.meta = meta;
  }
}