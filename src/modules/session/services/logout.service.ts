import { User } from "@data/modules/user/entities/user.entity";
import { Session } from "@data/modules/session/entities/session.entity";
import AppError from "@data/common/errors/AppError";
import { PgRepository } from "@data/common/repository";

export class LogoutService extends PgRepository {
  async execute(id: string): Promise<void> {
    const userRepo = this.getRepository(User);
    const sessionRepo = this.getRepository(Session);

    const user = await userRepo.findOneBy({ id });

    if (user == null) throw new Error("User not found!");

    const session = await sessionRepo
      .createQueryBuilder()
      .select("sessions.id")
      .from(Session, "sessions")
      .where("sessions.userId = :id", { id: user.id })
      .andWhere("sessions.active = :active", { active: true })
      .getOne();

    if (session == null) {
      throw new AppError("There are currently no active sessions!", 404);
    }

    await sessionRepo.update(session.id, { active: false });
  }
}
