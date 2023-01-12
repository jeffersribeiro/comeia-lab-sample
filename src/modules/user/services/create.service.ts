import { hash } from "bcryptjs";

import { User } from "../entities/user.entity";
import AppError from "@data/common/errors/AppError";
import { PgRepository } from "@data/common/repository";

export class CreateService extends PgRepository {
  async execute({
    email,
    firstName,
    lastName,
    password,
    username,
  }: User): Promise<User> {
    const userRepo = this.getRepository(User);

    const exists = await userRepo.findOneBy({ email });

    if (exists != null) {
      throw new AppError("The email has already been used!", 409);
    }

    const hashPassword = await hash(password, 8);

    const user = userRepo.create({
      email,
      firstName,
      lastName,
      password: hashPassword,
      username,
    });

    return await userRepo.save(user);
  }
}
