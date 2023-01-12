import AppError from "@data/common/errors/AppError";
import { PgRepository } from "@data/common/repository";
import { User } from "@data/modules/user/entities/user.entity";
import { Task } from "../entities/task.entity";

interface Page {
  page?: number;
  limit?: number;
  total?: number;
  take?: number;
  count?: number;
}

export class ListService extends PgRepository {
  async execute(
    id: string,
    { limit, page }: Page
  ): Promise<{ tasks: Task[]; paging: Page }> {
    const userRepo = this.getRepository(User);
    const taskRepo = this.getRepository(Task);

    const user = await userRepo.findOneBy({ id });

    if (user == null) throw new AppError("User not found!", 404);

    const total = await taskRepo.countBy({
      user: {
        id: user.id,
      },
    });

    const paging = Number(page ?? 0);
    const take = Number(limit ?? 20);

    const skip = take * (paging ? paging - 1 : paging);

    const tasks = await taskRepo.find({
      skip,
      order: { date: "ASC" },
      take,
      where: {
        user: {
          id: user.id,
        },
      },
    });
    return {
      tasks,
      paging: {
        page: paging ?? 1,
        total: Math.ceil(total / take),
      },
    };
  }
}
