import { getRepository } from "typeorm";
import path from "path";
import uploadConfig from "../config/upload";
import fs from "fs";
import User from "../models/User";

import AppError from "../errors/AppError";

interface Request {
  user_id: string | undefined;
  avatartFilename: string;
}

class UpdateUserAvatarService {
  public async execute({ user_id, avatartFilename }: Request): Promise<User> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError("Only authenticated users can change avatar", 401);
    }

    if (user.avatar) {
      //delete old avatar
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatartFilename;
    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
