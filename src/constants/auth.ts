// any route in this list is considered as unauthenticated routes, outside this list, app will redirect user to register page if user has not logged in yet
export const unauthRoutes = [
  "/login",
  "/register",
  "/forgot-password",
  "/register-selection",
  "/artists",
  "/artists/[id]",
  "/studios",
  "/studios/[id]",
  "/tattoos",
  "/tattoos/[id]",
  "/password/[type]",
];

export const PasswordValidationRegex = /(?=.*[a-zA-Z])(?=.*[0-9]).{6,10}/;