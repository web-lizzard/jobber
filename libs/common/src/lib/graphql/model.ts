import { ObjectType, Field, ID } from "@nestjs/graphql";

@ObjectType({isAbstract: true})
export class Model {
    @Field(() => ID)
    id: string;
}
