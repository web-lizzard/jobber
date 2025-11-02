import {  Resolver, Query, Mutation, Field, InputType, Args } from '@nestjs/graphql';
import { User } from './models/user.model';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.dto';



@Resolver(() => User)
export class UserResolver {
    
    constructor(private readonly userService: UserService) {}


    @Mutation(() => User)
    async createUser(@Args('input') input: CreateUserInput): Promise<User> {
        return await this.userService.createUser(input);
    }

    @Query(() => [User], {name: 'users' })
    async getUsers(): Promise<User[]> {
        return await this.userService.getUsers();
    }
}
