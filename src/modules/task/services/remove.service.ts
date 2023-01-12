import AppError from "@data/common/errors/AppError";

import { User } from "@data/modules/user/entities/user.entity";
import { Task } from "@data/modules/task/entities/task.entity";
import { PgRepository } from "@data/common/repository";

export class RemoveService extends PgRepository {
  async execute(uid: string, { id }: Task): Promise<void> {
    const userRepo = this.getRepository(User);
    const taskRepo = this.getRepository(Task);

    const user = await userRepo.findOneBy({ id: uid });
    if (user == null) throw new AppError("User not found!", 404);

    const task = await taskRepo.findOneBy({ id });
    if (task == null) throw new AppError("task not found!", 404);

    await taskRepo.delete(task.id);
  }
}
