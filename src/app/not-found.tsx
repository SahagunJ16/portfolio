import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mt-5 p-4">
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-medium before:content-['>'] before:mr-1">Not found</h1>
        <p className="text-base-content/80">The page you’re looking for doesn’t exist or was moved.</p>
        <Link
          href="/"
          className="text-sm font-medium underline hover:text-base-content/80 w-fit"
        >
          Back to home
        </Link>
      </div>
    </main>
  );
}
