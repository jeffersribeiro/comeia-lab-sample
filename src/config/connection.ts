import { DbTransaction } from "@contracts/db-transaction";
import { env } from "@config/env";
import {
  DataSource,
  ObjectLiteral,
  ObjectType,
  QueryRunner,
  Repository,
} from "typeorm";
import {
  ConnectionNotFoundError,
  TransactionNotFoundError,
} from "@common/errors";
import { Session } from "@data/modules/session/entities/session.entity";
import { User } from "@data/modules/user/entities/user.entity";
import { Task } from "@data/modules/task/entities/task.entity";

export class PgConnection implements DbTransaction {
  private static instance?: PgConnection;
  private query?: QueryRunner;
  private datasource?: DataSource;

  private constructor() {}

  static getInstance(): PgConnection {
    if (PgConnection.instance === undefined) {
      PgConnection.instance = new PgConnection();
    }
    return PgConnection.instance;
  }

  async connect(): Promise<void> {
    this.datasource = new DataSource({
      type: env.TYPEORM_CONNECTION,
      host: env.TYPEORM_HOST,
      port: env.TYPEORM_PORT,
      username: env.TYPEORM_USERNAME,
      password: env.TYPEORM_PASSWORD,
      database: env.TYPEORM_DATABASE,
      synchronize: env.TYPEORM_SYNCHRONIZE,
      logging: false,
      entities: [Session, User, Task],
      subscribers: [],
      migrations: [],
    });

    await this.datasource.initialize();
  }

  async disconnect(): Promise<void> {
    if (this.datasource === undefined) throw new ConnectionNotFoundError();
    await this.datasource.destroy();
    this.query = undefined;
    this.datasource = undefined;
  }

  async openTransaction(): Promise<void> {
    if (this.datasource === undefined) throw new ConnectionNotFoundError();
    this.query = this.datasource.createQueryRunner();
    await this.query.startTransaction();
  }

  async closeTransaction(): Promise<void> {
    if (this.query === undefined) throw new TransactionNotFoundError();
    await this.query.release();
  }

  async commit(): Promise<void> {
    if (this.query === undefined) throw new TransactionNotFoundError();
    await this.query.commitTransaction();
  }

  async rollback(): Promise<void> {
    if (this.query === undefined) throw new TransactionNotFoundError();
    await this.query.rollbackTransaction();
  }

  getRepository<Entity extends ObjectLiteral>(
    entity: ObjectType<Entity>
  ): Repository<Entity> {
    if (this.datasource === undefined) throw new ConnectionNotFoundError();
    if (this.query !== undefined) {
      return this.query.manager.getRepository(entity);
    }
    return this.datasource.getRepository(entity);
  }
}
