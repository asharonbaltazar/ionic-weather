import { logger, https, Response, Request } from 'firebase-functions';
import cors from 'cors';

const corsFunc = cors({ origin: true });

export const onRequest = (fn: (request: Request, response: Response) => void) =>
  https.onRequest((request, response) =>
    corsFunc(request, response, () => {
      try {
        return fn(request, response);
      } catch (error) {
        logger.error(error);
        return response.status(500).send('Internal Server Error');
      }
    })
  );
