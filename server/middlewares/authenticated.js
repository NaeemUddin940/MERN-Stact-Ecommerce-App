import jwt from "jsonwebtoken";
export async function authenticated(req, res, next) {
  try {
    const token =
      req.cookies.accessToken || req?.header?.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "You have to login first to access this page.",
        success: false,
        error: true,
      });
    }

    jwt.verify(
      token,
      process.env.JWT_SECRET_KEY_ACCESS_TOKEN,
      (err, decoded) => {
        if (err) {
          return res.status(403).json({
            message: "Your session has expired. Please login again.",
            success: false,
            error: true,
          });
        }

        // 3. Save user info in request
        req.user = decoded; // এখানে user এর id, email save হবে
        next();
      }
    );
  } catch (error) {
    return res.status(500).json({
      message:
        error.message ||
        "Something went wrong while authenticating. Try again later.",
      error: true,
      succcess: false,
    });
  }
}
