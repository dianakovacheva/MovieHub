import { EllipsisVertical } from "lucide-react";
import Link from "next/link";
import { deleteList } from "../app/actions/list/list-data";

type DropdownButtonProps = {
  link: string;
  id: string;
};

export default function DropdownButton({ link, id }: DropdownButtonProps) {
  return (
    <div className="dropdown sm:dropdown-bottom dropdown-end flex-none text-sm font-semibold">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle m-1">
        <EllipsisVertical />
      </div>
      {link && (
        <ul
          tabIndex={0}
          className="menu dropdown-content rounded-box z-1 w-52 p-2 shadow bg-base-200"
        >
          <li>
            <Link href={link}>View list</Link>
          </li>
          <li>
            <Link href={`${link}/edit`}>Edit</Link>
          </li>
          <li>
            <form
              action={async function () {
                await deleteList(id);
              }}
            >
              <button type="submit">Delete</button>
            </form>
          </li>
        </ul>
      )}
    </div>
  );
}
