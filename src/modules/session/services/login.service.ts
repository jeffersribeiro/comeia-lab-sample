import { addDays } from "date-fns";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import auth from "@data/config/auth";

import { User } from "@data/modules/user/entities/user.entity";
import { Session } from "@data/modules/session/entities/session.entity";
import { PgRepository } from "@data/common/repository";

export interface LoginDTO extends Pick<User, "email" | "password"> {
  ip: string;
}

export class LoginService extends PgRepository {
  async execute({ email, password, ip }: LoginDTO): Promise<Session> {
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

    const hashPassword = await compare(password, user.password);

    if (!hashPassword) throw new Error("Email or Password incorrect!");

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
