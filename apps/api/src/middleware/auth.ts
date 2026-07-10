import jwt from "jsonwebtoken";
export function authMiddleware(req: any, res: any, next: any) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      message: "Authorization headert missing"
    });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      message: "Token Missing"
    });
  }
  try {
    const decode = jwt.verify(token, process.env.JWT_SECRET!) as {
      userId: string;
      email: string;
    };
    req.user = decode;
    next();
  } catch {
    return res.status(401).json({
      message: "Invalid Token"
    });
  }
}
