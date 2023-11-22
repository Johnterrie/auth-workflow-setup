export type CallbackError = Error & {
  readonly name: string;
  readonly message: string;
  readonly stack?: string | undefined;
};
