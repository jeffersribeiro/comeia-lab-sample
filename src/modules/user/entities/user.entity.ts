import {
  Column,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinColumn,
} from "typeorm";

import { Task } from "@data/modules/task/entities/task.entity";
import { Session } from "@modules/session/entities/session.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column()
  username!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @OneToMany(() => Task, (task) => task.user)
  @JoinColumn()
  posts!: Task[];

  @OneToMany(() => Session, (session) => session.user)
  @JoinColumn()
  sessions!: Session[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
