import { Mutation, Resolver, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login-input.dto';
import { GqlContext } from '@jobber/common';
import { Context } from '@nestjs/graphql';
import { User } from '../users/models/user.model';

@Resolver(() => User)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => User)
  async login(
    @Args('loginInput') input: LoginInput,
    @Context() context: GqlContext
  ) {
    return this.authService.login(input, context.res);
  }
}
