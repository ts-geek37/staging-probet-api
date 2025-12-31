import { NextFunction, Request, Response } from "express";

const publicAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = authHeader.slice("Bearer ".length);

  if (token !== process.env.TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  }

  next();
};

export default publicAuth;
