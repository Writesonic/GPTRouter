/**
 * Represents a User entity in the database.
 */
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity,
    OneToMany,
} from "typeorm";
import { UserRole } from "../constants";
import { ModelUsage } from "./ModelUsage";


@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column({ nullable: false })
    email: string;

    @Column({ nullable: false })
    password: string;

    @Column({ type: 'enum', enum: UserRole })
    role: UserRole;

    @Column({ nullable: false, unique: true, default: () => 'uuid_generate_v4()' })
    apikey: string;

}
