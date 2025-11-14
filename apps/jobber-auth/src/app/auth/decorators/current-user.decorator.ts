import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { TokenPayload } from '../payloads/token-response.payload';
import { GqlContext } from '@jobber/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const CurrentUser = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): TokenPayload => {
    const context = GqlExecutionContext.create(ctx).getContext<GqlContext>();
    return context.req.user as TokenPayload;
  }
);
