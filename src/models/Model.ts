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
    OneToOne,
} from "typeorm";
import { Provider } from "./Provider";
import { ModelHealthCheck } from "./ModelHealthCheck";
import { ModelInputType } from "../constants";
import { Prompt } from "./Prompt";
import { ModelUsage } from "./ModelUsage";
import { ModelCost } from "./ModelCost";

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

    @ManyToOne(() => Provider, (provider) => provider.models)
    @JoinColumn({ name: "providerId" })
    provider: Provider;

    @Column({ name: "providerId", nullable: false })
    providerId: string;

    @CreateDateColumn({ default: () => "NOW()" })
    createdAt: Date;

    @UpdateDateColumn({ default: () => "NOW()" })
    updatedAt: Date;

    @Column({ type: 'enum', enum: ModelInputType })
    inputType: ModelInputType;

    @Column({ nullable: false })
    order: number;

    @OneToMany(() => ModelHealthCheck, (healthCheck) => healthCheck.model)
    healthChecks: ModelHealthCheck[];

    @OneToMany(() => ModelUsage, (usage) => usage.model)
    usages: ModelUsage[];

    @OneToOne(() => ModelCost, (cost) => cost.model)
    cost: ModelCost;
}
