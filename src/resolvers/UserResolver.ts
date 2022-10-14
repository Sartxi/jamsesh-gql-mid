import {
    Resolver,
    Mutation,
    Arg,
    Int,
    Query,
    InputType,
    Field,
    Subscription,
    Root,
    PubSub,
    PubSubEngine
} from "type-graphql";
import { User } from "../entity/User";
import { Notification } from "./notification.type";

@InputType()
class UserInput {
    @Field()
    firstName: string;

    @Field()
    lastName: string;

    @Field()
    status: string;

    @Field()
    avatar: string;

    @Field()
    lat: number;

    @Field()
    lng: number;

    @Field()
    groupId: number;

    @Field()
    created: string;
}

@InputType()
class UserUpdateInput {
    @Field(() => String, { nullable: true })
    firstName?: string;

    @Field(() => String, { nullable: true })
    lastName?: string;

    @Field(() => String, { nullable: true })
    status?: string;

    @Field(() => String, { nullable: true })
    avatar?: string;

    @Field(() => Number, { nullable: true })
    lat?: number;

    @Field(() => Number, { nullable: true })
    lng?: number;

    @Field(() => Number, { nullable: true })
    groupNumber?: number;

    @Field(() => String, { nullable: true })
    created?: string;
}

@Resolver()
export class UserResolver {
    @Mutation(() => User)
    async createUser(@Arg("options", () => UserInput) options: UserInput) {
        const user = await User.create(options).save();
        return user;
    }

    @Mutation(() => Boolean)
    async updateUser(
        @Arg("id", () => Int) id: number,
        @Arg("input", () => UserUpdateInput) input: UserUpdateInput,
        @PubSub() pubSub: PubSubEngine
    ) {
        await User.update({ id }, input);
        await pubSub.publish("UPDATEDUSER", id);
        return true;
    }

    @Mutation(() => Boolean)
    async deleteUser(@Arg("id", () => Int) id: number) {
        await User.delete({ id });
        return true;
    }

    @Query(() => [User])
    users() {
        return User.find();
    }

    @Query(() => User)
    user(@Arg("id", () => Int) id: number) {
        return User.findOne({ id });
    }

    @Query(() => [User])
    async groupUsers(@Arg("groupId", () => Int) groupId: number) {
        const users = await User.find();
        return users.filter(user => user.groupId === groupId);
    }

    @Subscription({ topics: "UPDATEDUSER" })
    updatedUser(@Root() id: number): Notification {
        return { id: id ? id : 0, date: new Date().toString() };
    }
}
