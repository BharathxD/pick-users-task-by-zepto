import PickUsers from "@/components/pick-users";
import Link from "next/link";

const Home = () => (
  <main className="space-y-6 p-8 md:p-24">
    <div className="space-y-2">
      <h1 className="bg-gradient-to-tr from-neutral-100 to-neutral-600 bg-clip-text text-4xl font-bold text-transparent">
        Pick users
      </h1>
      <Link
        className="text-sm text-neutral-500 underline underline-offset-4 transition-colors hover:text-neutral-400"
        target="_blank"
        href={`https://imbharath.tech/?utm_source=pick-users-zepto-assignment`}>
        &copy; Bharath Lakshman Kumar
      </Link>
    </div>
    <div className="flex min-h-[61px] w-fit min-w-[420px] rounded-lg border border-neutral-700 bg-neutral-800 p-2 text-sm shadow-sm outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50">
      <PickUsers />
    </div>
  </main>
);

export default Home;
