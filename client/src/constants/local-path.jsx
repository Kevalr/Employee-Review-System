import Login from "../components/login-form";
import Register from "../components/sign-up-form";
import Users from "../views/Users";


const PathAuth = {
  Login: "/login",
  Register: "/register",
  ForgotPassword: "/forgot-password",
  ResetPassword: "/reset-password",
  SuccessEmail: "/success-email",
  EmailVerification: "/email-verification",
};

const PathDashboard = {
  Reviews: "/reviews",
  Users: "/users",
  GiveReviews: "/give-reviews",
};

const Path = {
  // No layout
  Root: "/", // This redirect to Login

  // Auth layout
  ...PathAuth,

  ...PathDashboard,

  NotFound: "/not-found",
};

const ProtectedRoutes = [
  {
    element: <Users />,
    path: Path.Users,
    name: "Users",
    adminOnly: true,
  },
  {
    element: <>Review List</>,
    path: Path.Reviews,
    name: "Reviews",
    adminOnly: true,
  },
  {
    element: <>Pending Reviews</>,
    path: Path.GiveReviews,
    name: "Reviews",
    adminOnly: false,
  },
];

const PublicRoutes = [
  {
    element: <Login />,
    path: Path.Login,
    name: "Login",
    subRoute: [],
  },
  {
    element: <Register />,
    path: Path.Register,
    name: "Register",
    subRoute: [],
  },
];

export { ProtectedRoutes, PublicRoutes };

export default Path;
