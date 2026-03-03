import { Metadata } from "next";
import css from "./not-found.module.css";

export const metadata: Metadata = {
  title: "404 - Page not found",
  description: "Something went wrong and page can not be founding out",
  openGraph: {
    title: "404 - Page not found",
    description: "Something went wrong and page can not be founding out",
    url: "",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/404-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "404 - Page not found",
      },
    ],
    type: "article",
  },
};

export default function NotFound() {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}
