/**
 * Entity representing a Prompt in the database.
 */
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
