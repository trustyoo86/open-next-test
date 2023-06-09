import Link from "next/link";

function Page() {
  return (
    <div>Index page
      <Link href="/about/1">About Page Link</Link>
    </div>
  );
}

export default Page;
