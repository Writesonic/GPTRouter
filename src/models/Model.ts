import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { ModelInputType } from "../constants";
import { ModelCost } from "./ModelCost";
import { ModelHealthCheck } from "./ModelHealthCheck";
import { ModelUsage } from "./ModelUsage";
import { Provider } from "./Provider";

/**
 * Entity representing a model in the application.
 */
@Entity()
export class Model extends BaseEntity {
  /**
   * Unique identifier for the model.
   */

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: false })
  name: string;

  @ManyToOne(() => Provider, provider => provider.models)
  @JoinColumn({ name: "providerId" })
  provider: Provider;

  @Column({ name: "providerId", nullable: false })
  providerId: string;

  @CreateDateColumn({ default: () => "NOW()" })
  createdAt: Date;

  @UpdateDateColumn({ default: () => "NOW()" })
  updatedAt: Date;

  @Column({ type: "enum", enum: ModelInputType })
  inputType: ModelInputType;

  @Column({ nullable: false })
  order: number;

  @OneToMany(() => ModelHealthCheck, healthCheck => healthCheck.model)
  healthChecks: ModelHealthCheck[];

  @OneToMany(() => ModelUsage, usage => usage.model)
  usages: ModelUsage[];

  @OneToOne(() => ModelCost, cost => cost.model)
  cost: ModelCost;
}
