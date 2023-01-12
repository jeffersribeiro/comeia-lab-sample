import AppError from "@data/common/errors/AppError";
import { PgRepository } from "@data/common/repository";

import { User } from "@data/modules/user/entities/user.entity";
import { Task } from "../entities/task.entity";

export class UpdateService extends PgRepository {
  async execute(
    uid: string,
    { id, description, done }: Partial<Task>
  ): Promise<Task> {
    const userRepo = this.getRepository(User);
    const taskRepo = this.getRepository(Task);

    const user = await userRepo.findOneBy({ id: uid });
    if (user == null) throw new AppError("User not found!", 404);

    const task = await taskRepo.findOneBy({ id });

    if (task == null) throw new AppError("task not found!", 404);

    task.description = description ?? task.description;
    task.done = done ?? task.done;

    await taskRepo.update(task.id, task);
    return task;
  }
}
