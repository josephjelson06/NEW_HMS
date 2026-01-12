export const getRedirectPath = (user) => {
  if (user.role === "SUPER_ADMIN") return "/superadmin";
  if (user.role === "HOTEL_ADMIN")
    return `/admin/${user.hotelSlug}`;

  return "/login";
};
