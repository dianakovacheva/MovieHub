import { Github } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer footer-horizontal footer-center text-base-content p-5 relative bottom-0 left-0 right-0 mb-0">
      <aside className="flex flex-col md:flex-row items-end">
        Copyright © {new Date().getFullYear()} - Developed by Diana Kovacheva.
        Source code at{" "}
        <Link
          href={
            "https://github.com/dianakovacheva/MovieHub/tree/7d0216ea3971f5325fec7118880977989712aa2e/movie-hub"
          }
          target="_blank"
        >
          <Github size={16} />
        </Link>
      </aside>
    </footer>
  );
}
