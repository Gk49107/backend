/* 
  https://docs.nestjs.com/interceptors#interceptors
*/
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  DefaultMessage,
  ResponseStatus,
  DefaultResponseType,
  jwtConstants,
} from './constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CommonInterceptor implements NestInterceptor {
  constructor(private jwtService: JwtService) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
      try {
        const res = this.jwtService.verify(token, {
          secret: jwtConstants.secret,
        });

        req.body['logged_id'] = res.id;
        req.body['company_id'] = res.access
          ? req.body.company_id || req.query.company_id
          : res.company_id;
      } catch (error) {
        throw new HttpException(
          DefaultMessage.INVALID_TOKEN,
          ResponseStatus.BAD_REQUEST,
        );
      }
    }
    return next.handle().pipe(
      map(({ data = {}, message, type }) => ({
        type: type ? type : DefaultResponseType.ERROR_MSG,
        ...(message ? { message: message } : {}),
        ...data,
      })),
    );
  }
}
