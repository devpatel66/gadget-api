import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

export default async function userRepo() {
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }
    return AppDataSource.getRepository(User);
}