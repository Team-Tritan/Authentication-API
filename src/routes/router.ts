import { Router } from "express";
import AllRoutes from "./handlers/allRoutes";
import Error404 from "./handlers/404";
import Error500 from "./handlers/500";
import IndexRoute from "./index/index";
import LoginRoute from "./api/login";
import RegisterRoute from "./api/register";
import ResetPasswordLoggedIn from "./api/resetLoggedIn";
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
