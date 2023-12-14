import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Model } from "./Model";
import { Provider } from "./Provider";

/**
 * Entity representing the usage of a specific model by a provider for a user.
 */
@Entity()
export class ModelUsage extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Model, model => model.usages)
  @JoinColumn({ name: "modelId" })
  model: Model;

  @Column({ name: "modelId", nullable: false })
  modelId: string;

  @ManyToOne(() => Provider, provider => provider.usages)
  @JoinColumn({ name: "providerId" })
  provider: Provider;

  @Column({ name: "providerId", nullable: false })
  providerId: string;

  @Column({ name: "userId", nullable: false })
  userId: string;

  @Column({ nullable: false })
  promptTokens: number;

  @Column({ nullable: false })
  completionTokens: number;

  @Column({ nullable: false })
  totalTokens: number;

  @Column({ name: "cost", type: "float", nullable: false })
  cost: number;

  @CreateDateColumn({ default: () => "NOW()" })
  createdAt: Date;
}
