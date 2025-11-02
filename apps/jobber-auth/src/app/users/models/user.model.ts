import { Field, ObjectType } from '@nestjs/graphql';
import { Model } from '@jobber/common';

@ObjectType()
export class User extends Model {
    @Field(() => String)
    email: string;
}