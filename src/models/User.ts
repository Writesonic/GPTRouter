/**
 * Represents a User entity in the database.
 */
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { UserRole } from "../constants";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ type: "enum", enum: UserRole })
  role: UserRole;

  @Column({ nullable: false, unique: true, default: () => "uuid_generate_v4()" })
  apikey: string;
}
