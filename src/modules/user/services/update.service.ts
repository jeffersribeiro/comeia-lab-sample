import { PgRepository } from "@data/common/repository";
import { User } from "../entities/user.entity";

export class UpdateService extends PgRepository {
  async execute(
    id: string,
    { firstName, lastName, username }: User
  ): Promise<User> {
    const userRepo = this.getRepository(User);

    const user = await userRepo.findOneBy({ id });
    if (user == null) throw new Error("User not Found!");

    user.firstName = firstName;
    user.lastName = lastName;
    user.username = username;

    await userRepo.update(id, user);
    return user;
  }
}
