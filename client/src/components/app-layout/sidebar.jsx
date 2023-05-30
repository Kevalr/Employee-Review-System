import { useNavigate, useLocation } from "react-router-dom";
import { isAdmin } from "../../utils/helper";

const getParentPath = (pathname) => `/${pathname.split("/")[1]}`;

const Sidebar = () => {
  const navigate = useNavigate();

  const { pathname } = useLocation();
  const matchPathname = getParentPath(pathname);

  return (
    <>
      <aside className="bg-slate-950 text-white flex-shrink-0 w-48 block bg-primary py-2 overflow-y-auto z-20 ">
        <div className="flex justify-center items-center text-xl font-semibold text-blue-300 mb-3">
          <h3 className="text-center">
            RK <br /> Developers
          </h3>
        </div>
        <hr />
        <div className="mt-4 text-gray-lighter flex flex-col">
          {isAdmin() && (
            <>
              <button
                className="relative pt-4 pb-2 cursor-pointer hover:bg-primary-light active:bg-primary-dark "
                onClick={() => navigate("/users")}
              >
                {getParentPath("/users") === matchPathname && (
                  <div className="absolute h-full w-2 top-0 left-0 bg-blue-300" />
                )}
                <p className="text-lg text-gray-300 text-center">Users</p>
              </button>
              <button
                className="relative pt-4 pb-2 cursor-pointer hover:bg-primary-light active:bg-primary-dark "
                onClick={() => navigate("/reviews")}
              >
                {getParentPath("/reviews") === matchPathname && (
                  <div className="absolute h-full w-2 top-0 left-0 bg-blue-300" />
                )}
                <p className="text-lg text-gray-300 text-center">Reviews</p>
              </button>
            </>
          )}
          <button
            className="relative pt-4 pb-2 cursor-pointer hover:bg-primary-light active:bg-primary-dark "
            onClick={() => navigate("/give-reviews")}
          >
            {getParentPath("/give-reviews") === matchPathname && (
              <div className="absolute h-full w-2 top-0 left-0 bg-blue-300" />
            )}
            <p className="text-lg text-gray-300 text-center">Give Reviews</p>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
