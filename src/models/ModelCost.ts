import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { Model } from "./Model";
import { Provider } from "./Provider";

/**
 * ModelCost Entity
 */
@Entity()
export class ModelCost extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @OneToOne(() => Model, model => model.cost)
  @JoinColumn({ name: "modelId" })
  model: Model;

  @Column({ name: "modelId", nullable: false })
  modelId: string;

  @ManyToOne(() => Provider, provider => provider.costs)
  @JoinColumn({ name: "providerId" })
  provider: Provider;

  @Column({ name: "providerId", nullable: false })
  providerId: string;

  @Column({ type: "float", name: "input", nullable: false })
  input: number;

  @Column({ type: "float", name: "output", nullable: false })
  output: number;

  @Column({ name: "factor", nullable: false })
  factor: number;
}
