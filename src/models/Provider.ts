/**
 * Definition for Provider entity
 */
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { Model } from "./Model";
import { ModelCost } from "./ModelCost";
import { ModelHealthCheck } from "./ModelHealthCheck";
import { ModelUsage } from "./ModelUsage";

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
