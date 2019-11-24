import * as Gate from "./gate";
import * as Scotty from "./scotty";
import * as Message from "./message";

export { Gate, Scotty, Message };

export class Error {
  code?: string;
  title: string;
  detail: string;
  status?: number;

  constructor(title: string, detail: string, status?: number, code?: string) {
    this.code = code;
    this.status = status;
    this.title = title;
    this.detail = detail;
  }
}

export class EventBusFailure extends Error {
  constructor(detail: string) {
    super(
      "Event Bus failure",
      String(detail)
    );
  }
}

export class BadRequestError extends Error {
  constructor(detail: string) {
    super(
      "Bad Request",
      String(detail),
      400
    );
  }
}