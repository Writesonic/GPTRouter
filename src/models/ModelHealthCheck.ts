import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

import { Model } from "./Model";
import { Provider } from "./Provider";

/**
 * ModelHealthCheck Entity representing the health check of a model.
 */
@Entity()
export class ModelHealthCheck extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Model, model => model.healthChecks)
  @JoinColumn({ name: "modelId" })
  model: Model;

  @Column({ name: "modelId", nullable: false })
  modelId: string;

  @ManyToOne(() => Provider, provider => provider.healthChecks)
  @JoinColumn({ name: "providerId" })
  provider: Provider;

  @Column({ name: "providerId", nullable: false })
  providerId: string;

  @Column()
  status: string;

  @Column({ name: "isAvailable", default: false, nullable: false })
  isAvailable: boolean;

  @Column({ type: "float", name: "latency", nullable: true })
  latency: number;

  @CreateDateColumn({ name: "lastChecked" })
  lastChecked: Date;
}
