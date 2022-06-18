import { Router } from "express";
import AllRoutes from "../middleware/allRoutes";
import Error404 from "../middleware/404";
import Error500 from "../middleware/500";
import IndexRoute from "./index/index";
import LoginRoute from "./api/login";
import RegisterRoute from "./api/register";
import ResetPasswordLoggedIn from "./api/reset";

const router = Router();

router.use("*", AllRoutes);

router.use("/", IndexRoute);
router.use("/api/login", LoginRoute);
router.use("/api/register", RegisterRoute);
router.use("/api/resetLoggedIn", ResetPasswordLoggedIn);

// Error Handling
router.use("*", Error404);
router.use("*", Error500);

export default router;
