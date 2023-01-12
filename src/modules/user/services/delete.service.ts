import { PgRepository } from "@data/common/repository";
import { User } from "../entities/user.entity";

export class DeleteService extends PgRepository {
  async execute(id: string): Promise<void> {
    const userRepo = this.getRepository(User);

    const user = await userRepo.findOneBy({ id });
    if (user == null) throw new Error("User not Found!");

    await userRepo.delete(user);
  }
}
