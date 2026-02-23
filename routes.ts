/**
 * An array of routes that are accessible to the public
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = [
    "/",
    "/h/services",
    "/h/appointment",
    "/h/blogs",
    "/h/blog/:id",
    "/h/blog/[id]",
    "/api/contact",
    "/api/book-appointment",
    "/api/blog",
    "/api/blogs",
    "/api/blog/:id",
    "/api/admin/contact-submissions",
    "/course-by-meditationastro.pdf",
];

/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
    "/auth/reset",
    "/auth/new-password",
];

/**
 * The prefix for API authentication routes
 * Routes that start with this prefix are used for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/h";

