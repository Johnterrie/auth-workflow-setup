import crypto from "crypto";

const hashString = (data: string) =>
  crypto.createHash("md5").update(data).digest("hex");

export default hashString;
