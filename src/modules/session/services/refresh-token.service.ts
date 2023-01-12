import { addDays } from "date-fns";
import { sign } from "jsonwebtoken";

import auth from "@data/config/auth";

import { PgRepository } from "@data/common/repository";

import { User } from "@data/modules/user/entities/user.entity";
import { Session } from "@data/modules/session/entities/session.entity";

export interface RefreshTokenDTO {
  ip: string;
  email: string;
}

export class RefreshTokenService extends PgRepository {
  async execute({ ip, email }: RefreshTokenDTO): Promise<Session> {
    const userRepo = this.getRepository(User);
    const sessionRepo = this.getRepository(Session);

    const user = await userRepo.findOneBy({ email });

    if (user == null) throw new Error("User not found!");

    const session = await sessionRepo.findOneBy({
      user: {
        id: user.id,
      },
      active: true,
    });

    if (session != null)
      await sessionRepo.update(session.id, { active: false });

    const { expiresIn, secret, refreshSecret } = auth.jwt;
    const token = sign({}, secret, {
      subject: user.id.toString(),
      expiresIn,
    });

    const refreshToken = sign({ email: user.email }, refreshSecret, {
      expiresIn: "10d",
    });

    const expiresAt = addDays(new Date(), 2);

    const activeSession = sessionRepo.create({
      user,
      token,
      refreshToken,
      ip,
      expiresAt,
    });

    return await sessionRepo.save(activeSession);
  }
}
