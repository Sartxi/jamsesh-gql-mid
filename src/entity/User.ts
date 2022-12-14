import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column()
  status: string;

  @Field()
  @Column()
  avatar: string;

  @Field()
  @Column()
  lat: number;

  @Field()
  @Column()
  lng: number;

  @Field()
  @Column()
  groupId: number;

  @Field()
  @Column()
  created: string;
}