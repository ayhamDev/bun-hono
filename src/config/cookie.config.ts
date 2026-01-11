const ms = require("ms");

export const COOKIE_CONFIG = {
  ADMIN_REFRESH_TOKEN: {
    name: "admin_refresh_token",
    maxAge: ms("3d") / 1000, // 7 days
    httpOnly: true,
    secure: Bun.env.NODE_ENV === "production",
    sameSite: "strict",
    domain: Bun.env.DOMAIN,
    path: "/",
  },
  ADMIN_CLEAR: {
    name: "admin_refresh_token",
    maxAge: 0, // 0 means delete the cookie
    httpOnly: true,
    secure: Bun.env.NODE_ENV === "production",
    sameSite: "strict",
    domain: Bun.env.DOMAIN,
    path: "/",
  },
} as const;
