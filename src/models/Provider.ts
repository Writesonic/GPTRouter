/**
 * Definition for Provider entity
 */
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
} from "typeorm";
import { ModelHealthCheck } from "./ModelHealthCheck";
import { Model } from "./Model";
import { ModelUsage } from "./ModelUsage";
import { ModelCost } from "./ModelCost";

@Entity()
export class Provider extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true, nullable: false })
  name: string;

  @CreateDateColumn({ default: () => "NOW()" })
  createdAt: Date;

  @UpdateDateColumn({ default: () => "NOW()" })
  updatedAt: Date;

  @OneToMany(() => Model, model => model.provider)
  models?: Model[];

  @OneToMany(() => ModelHealthCheck, healthCheck => healthCheck.provider)
  healthChecks?: ModelHealthCheck[];

  @OneToMany(() => ModelUsage, usage => usage.provider)
  usages: ModelUsage[];

  @OneToMany(() => ModelCost, cost => cost.provider)
  costs?: ModelCost[];
}
