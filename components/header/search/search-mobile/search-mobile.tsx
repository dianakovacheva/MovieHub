import { Search, X } from "lucide-react";

export default function SearchMobile() {
  return (
    <div className="md:hidden dropdown dropdown-center">
      <div tabIndex={0} role="button" className="btn btn-ghost">
        <div className="indicator">
          <Search />
        </div>
      </div>
      <div
        tabIndex={0}
        className="card card-compact dropdown-content bg-base-200 z-1 mt-3 shadow"
      >
        <label className="input input-md flex justify-between items-center">
          <input type="text" placeholder="Search" className="w-24" />
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <X className="opacity-50" />
            </div>
          </div>
        </label>
      </div>
    </div>
  );
}
