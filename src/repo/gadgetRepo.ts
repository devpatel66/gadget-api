import { AppDataSource } from "../data-source";
import { Gadget } from "../entity/Gadget";

export default async function gadgetRepo() {
    if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
    }
    return AppDataSource.getRepository(Gadget);
}