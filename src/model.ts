export namespace Harness {
  export enum Severity {
    BLOCKER = "blocker",
    MAJOR = "major",
    WARNING = "warning",
    INFO = "info"
  }

  export enum Conclusion {
    /** all is ok */
    PASSED = "passed",
    /** can not decide if this is ok */
    UNDECISIVE = "undecisive",
    /** is not ok */
    BLOCKED = "blocked",
    /** something went wrong */
    ANALYSIS_FAILURE = "analysis_failure"
  }

  /** Annotation superclass */
  export abstract class Annotation {
    readonly type: AnnotationType;

    /** Title of the annotation */
    title: string;

    /** Some detail information */
    detail?: string;

    /** Link to extra information */
    href?: string;

    /** Severity of the Annotation */
    severity: Severity;

    /** Extra information concerning the annotation */
    metadata?: Object;

    constructor(type: AnnotationType) {
      this.type = type;
    }
  }

  /** An annotation, which can point to a specific file in the analysis context
   */
  export class FileAnnotation extends Annotation {
    /** path to the file */
    path: string;
    /** starting line targeted by the annotation */
    start?: number;
    /** ending line targeted by the annotation */
    end?: number;

    constructor() {
      super(AnnotationType.FILE);
    }
  }

  /** An annotation targeting the whole analyzed project
   */
  export class ProjectAnnotation extends Annotation {
    constructor() {
      super(AnnotationType.PROJECT);
    }
  }

  export enum AnnotationType {
    FILE = "file",
    PROJECT = "project"
  }

  export interface AnalysisReport {
    /** Sender of this notification (plugin name) */
    sender: string;
    /** SCM source of the report */
    source: ScmSource;
    /** link to details */
    link?: string;

    /** additional information */
    metadata?: Object;

    /** title of the report */
    title: string;
    /** short description of the report */
    shortMessage?: string;
    /** markdown content of the report */
    markdown?: string;
    /** conclusion of the report */
    checkStatus?: Harness.Conclusion;
    /** annotations of the report */
    annotations?: Harness.Annotation[];
    /** unique id of the build, which spans over a number of AnalysisReports */
    uuid?: string;
    /** timestamp of the report */
    timestamp?: Date;
  }

  export abstract class ScmSource {
    type: ScmType;

    abstract toRefString(): string;
    abstract isDataComplete(): boolean;

    constructor(type: ScmType) {
      this.type = type;
    }
  }

  export class GitSource extends ScmSource {
    remote: string;
    repo: string;
    sha: string;
    branch: string[];

    public toRefString() {
      return `${this.repo}@${this.sha}`;
    }

    public isDataComplete(): boolean {
      return !!this.repo && !!this.sha && !!this.branch;
    }

    constructor() {
      super(ScmType.GIT);
    }
  }

  export class GithubSource extends ScmSource {
    remote: string;
    owner: string;
    repo: string;
    sha: string;
    branch: string[];

    public toRefString() {
      return `${this.owner}/${this.repo}@${this.sha}`;
    }

    public isDataComplete(): boolean {
      return !!this.repo && !!this.sha && !!this.branch && !!this.owner;
    }

    constructor() {
      super(ScmType.GITHUB);
    }
  }

  export enum ScmType {
    GITHUB = "github",
    GIT = "git"
  }

  export interface RawRepositoryConfig {
    plugin?: any;
    yoke?: any;
  }

  export class RepositoryConfig implements RawRepositoryConfig {
    plugin?: any;
    yoke?: any;

    constructor(rawConfig: RawRepositoryConfig) {
      Object.assign(this, rawConfig);
    }

    public hasPluginConfig(pluginId: string): boolean {
      return this.plugin && this.plugin.hasOwnProperty(pluginId);
    }

    public getPluginConfig<T>(pluginId: string): T {
      if (!this.plugin) {
        return undefined;
      }
      return this.plugin[pluginId];
    }
  }
}