import * as fastify from "fastify";

declare module "fastify" {
  export interface FastifyInstance<HttpServer = Server, HttpRequest = IncomingMessage, HttpResponse = ServerResponse> {
    authenticate: (req: any, res: any) => void;
  }
}
