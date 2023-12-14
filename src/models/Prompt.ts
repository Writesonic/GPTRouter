/**
 * Entity representing a Prompt in the database.
 */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  OneToOne,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { Model } from "./Model";
import { PromptParamsProperties } from "../types/prompt.interface";

@Entity()
export class Prompt extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  title: string;

  @Column({ type: "json", nullable: false })
  models: Array<string>;

  @Column({ type: "json", nullable: false })
  promptParams: PromptParamsProperties;

  @Column({ nullable: false, default: false })
  isDeleted: boolean;

  @Column({ nullable: false })
  parentPromptId: string;

  @Column({ nullable: false })
  versionNumber: number;

  @Column({ nullable: true })
  updateMessage: string;

  @CreateDateColumn({ default: () => "NOW()" })
  createdAt: Date;

  @UpdateDateColumn({ default: () => "NOW()" })
  updatedAt: Date;
}
