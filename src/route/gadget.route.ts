import { Router } from "express";
import { getAllGadgets,addGadget, updateGadget, deleteGadget,seftDestructGadget } from "../controller/gadgetController";
import veriifyJwt from "../middleware/auth.middleware";

const gadgetRouter = Router();

gadgetRouter.route("").get(veriifyJwt,getAllGadgets)
gadgetRouter.route("").post(veriifyJwt,addGadget)
gadgetRouter.route("").patch(veriifyJwt,updateGadget)
gadgetRouter.route("/:id").delete(veriifyJwt,deleteGadget)
gadgetRouter.route("/:id/self-destruct").post(veriifyJwt,seftDestructGadget)
gadgetRouter.route("/?status={status}").post(veriifyJwt,seftDestructGadget)

export default gadgetRouter;