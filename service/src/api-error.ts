export class APIError extends Error {
  public status: number;
  public code?: string;
  public clientMessage?: string;
  public preventLogout?: boolean;

  constructor(
    status: number,
    message: string,
    rest?: { code?: string; clientMessage?: string; preventLogout?: boolean },
  ) {
    super();
    this.name = "APIError";
    this.status = status;
    this.message = message;

    if (rest) {
      Object.assign(this, rest);
    }
  }
}
