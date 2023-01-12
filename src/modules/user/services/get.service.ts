import { PgRepository } from "@data/common/repository";
import { User } from "../entities/user.entity";

export class GetService extends PgRepository {
  async execute(id: string): Promise<User> {
    const userRepo = this.getRepository(User);

    const user = await userRepo.findOneBy({ id });
    if (user == null) throw new Error("User not Found!");

    return user;
  }
}
