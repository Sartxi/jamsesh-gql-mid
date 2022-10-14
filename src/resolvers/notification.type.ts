import {
    Field,
    ObjectType
} from "type-graphql";

@ObjectType()
export class Notification {
    @Field()
    id?: number;

    @Field()
    date?: String;
}
