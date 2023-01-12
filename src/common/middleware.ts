export interface Middleware {
  handle: (httpReuquest: any) => Promise<any>;
}
