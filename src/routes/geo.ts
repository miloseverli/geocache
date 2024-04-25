import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import GoogleGeohashService from '../service/defaultgeohashservice';

export default (
  fastify: FastifyInstance<Server, IncomingMessage, ServerResponse>,
  _: FastifyPluginOptions,
  next: (error?: Error) => void,
): void => {
  fastify.get('/geo', async (request: FastifyRequest, reply: FastifyReply) => {
    const origin = (<any>request.query)['origin'].split(',') as string[];
    const destination = (<any>request.query)['destination'].split(',') as string[];
    const output = await new GoogleGeohashService().get(
      { latitude: parseFloat(origin[0]), longitude: parseFloat(origin[1]) },
      { latitude: parseFloat(destination[0]), longitude: parseFloat(destination[1]) },
    );
    return reply.send(output);
  });

  next();
};
