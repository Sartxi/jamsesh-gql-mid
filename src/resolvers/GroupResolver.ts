import {
    Resolver,
    Mutation,
    Arg,
    Int,
    Query,
    InputType,
    Field
} from "type-graphql";
import { Group } from "../entity/Group";

@InputType()
class GroupInput {
    @Field()
    name: string;
}

@InputType()
class GroupUpdateInput {
    @Field(() => String, { nullable: true })
    name?: string;
}

@Resolver()
export class GroupResolver {
    @Mutation(() => Group)
    async createGroup(@Arg("options", () => GroupInput) options: GroupInput) {
        const movie = await Group.create(options).save();
        return movie;
    }

    @Mutation(() => Boolean)
    async updateGroup(
        @Arg("id", () => Int) id: number,
        @Arg("input", () => GroupUpdateInput) input: GroupUpdateInput
    ) {
        await Group.update({ id }, input);
        return true;
    }

    @Mutation(() => Boolean)
    async deleteGroup(@Arg("id", () => Int) id: number) {
        await Group.delete({ id });
        return true;
    }

    @Query(() => [Group])
    groups() {
        return Group.find();
    }

    @Query(() => Group)
    group(@Arg("id", () => Int) id: number) {
        return Group.findOne({ id });
    }
}
