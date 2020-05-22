export class Notification {
    constructor(
      public id: string,
      public message: string,
      public severity: string,
      public username: string,
      public seen: boolean) { }
  }
