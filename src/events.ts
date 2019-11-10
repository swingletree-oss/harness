
/** Event superclass
 */
export abstract class SwingletreeEvent {
  id: string;
  eventType: string;

  constructor(eventType: string) {
    this.eventType = eventType;
  }

  public getEventType(): string {
    return this.eventType;
  }
}

export abstract class CoreEvent extends SwingletreeEvent {
  constructor(eventType: string) {
    super(eventType);
  }
}