import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserSchema } from '../../user/db/user-schema';

export const CurrentUser = createParamDecorator((data, context: ExecutionContext): UserSchema => {
  const req = context.switchToHttp().getRequest();
  return req.user;
});
