import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

function Navbar() {
  const productAmount = useSelector(
    (state: RootState) => state.products.amount
  );

  return (
    <header className="flex bg-white border-b py-4 sm:px-8 px-6 font-[sans-serif] min-h-[80px] tracking-wide relative z-50 mb-5">
      <div className="flex flex-wrap items-center lg:gap-y-2 gap-4 w-full max-w-[1340px] mx-auto">
        <Link className="text-2xl" to="/">
          𝐍𝐞𝐰𝐌𝐚𝐫𝐤𝐞𝐭
        </Link>

        <div
          id="collapseMenu"
          className="lg:ml-10 max-lg:hidden lg:!block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50"
        ></div>

        <Link to="/cart" className="flex gap-x-6 gap-y-4 ml-auto">
          <div className="flex items-center space-x-8">
            <span className="relative">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                className="cursor-pointer fill-[#333] inline"
                viewBox="0 0 512 512"
              >
                <path
                  d="M164.96 300.004h.024c.02 0 .04-.004.059-.004H437a15.003 15.003 0 0 0 14.422-10.879l60-210a15.003 15.003 0 0 0-2.445-13.152A15.006 15.006 0 0 0 497 60H130.367l-10.722-48.254A15.003 15.003 0 0 0 105 0H15C6.715 0 0 6.715 0 15s6.715 15 15 15h77.969c1.898 8.55 51.312 230.918 54.156 243.71C131.184 280.64 120 296.536 120 315c0 24.812 20.188 45 45 45h272c8.285 0 15-6.715 15-15s-6.715-15-15-15H165c-8.27 0-15-6.73-15-15 0-8.258 6.707-14.977 14.96-14.996zM477.114 90l-51.43 180H177.032l-40-180zM150 405c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm167 15c0 24.813 20.188 45 45 45s45-20.188 45-45-20.188-45-45-45-45 20.188-45 45zm45-15c8.27 0 15 6.73 15 15s-6.73 15-15 15-15-6.73-15-15 6.73-15 15-15zm0 0"
                  data-original="#000000"
                ></path>
              </svg>
              <span className="absolute left-auto -ml-1 top-0 rounded-full bg-red-500 px-1 py-0 text-xs text-white">
                {productAmount}
              </span>
            </span>
          </div>
        </Link>
      </div>
    </header>
  );
}

export default Navbar;
