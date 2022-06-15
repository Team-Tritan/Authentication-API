import { Router } from "express";
import AllRoutes from "./handlers/allRoutes";
import Error404 from "./handlers/404";
import Error500 from "./handlers/500";
import IndexRoute from "./index/index";

const router = Router();

router.use("*", AllRoutes);

router.use("/", IndexRoute);

// Error Handling
router.use("*", Error404);
router.use("*", Error500);

export default router;
