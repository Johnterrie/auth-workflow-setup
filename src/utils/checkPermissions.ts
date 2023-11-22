import { UnauthorizedError } from "../error";
import mongoose from "mongoose";

const checkPermissions = (
  requestUser: { role: string; userId: string },
  resourceUserId: string | mongoose.Types.ObjectId
) => {
  // console.log(requestUser);
  // console.log(resourceUserId);
  // console.log(typeof resourceUserId);
  if (requestUser.role === "admin") return;
  if (requestUser.userId === resourceUserId.toString()) return;
  throw new UnauthorizedError("Not authorized to access this route");
};

export default checkPermissions;
