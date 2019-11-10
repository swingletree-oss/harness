import { Error as ResponseError } from ".";

/** A message containing a set of errors
 */
export class ErrorMessage {
  errors: ResponseError[];

  constructor(error?: ResponseError) {
    this.errors = [];

    if (error) {
      this.errors.push(error);
    }
  }

  /** Adds a ResponseError to the set
   *
   * @param error ResponseError to add to the set.
   */
  public add(error: ResponseError): ErrorMessage {
    if (error) {
      this.errors.push(error);
    }
    return this;
  }

  public addAll(errors: ResponseError[]): ErrorMessage {
    if (errors && errors.length > 0) {
      this.errors.push(...errors);
    }
    return this;
  }

  /** Adds a Javascript Error to the set.
   *
   * Wraps the error in a ResponseError before adding it.
   *
   * @param error Javascript Error to add to the response
   */
  public addError(error: Error) {
    if (error) {
      this.errors.push(new ResponseError(
        "General Error",
        `${error.name}: ${error.message}`
      ));
    }
  }
}

export interface BasicMessage<D> {
  data: D;
}

export class EmptyMessage {
  data: object = {};
}

export interface WithMetaMessage<D, M> extends BasicMessage<D> {
  meta?: M;
}