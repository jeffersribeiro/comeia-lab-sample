import AppError from "@data/common/errors/AppError";
import { PgRepository } from "@data/common/repository";
import { User } from "@data/modules/user/entities/user.entity";
import { Task } from "../entities/task.entity";

export class CreateService extends PgRepository {
  async execute(id: string, { date, description }: Task): Promise<Task> {
    const userRepo = this.getRepository(User);
    const taskRepo = this.getRepository(Task);

    const user = await userRepo.findOneBy({ id });

    if (user == null) throw new AppError("User not found!", 404);

    const task = taskRepo.create({ user, date, description });

    return await taskRepo.save(task);
  }
}
