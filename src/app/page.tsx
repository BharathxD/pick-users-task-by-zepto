import PickUsers from "@/components/pick-users";
import Link from "next/link";

const Home = () => (
  <main className="h-dvh space-y-16 p-8 md:p-24">
    <div className="mx-auto mt-40 max-w-[50dvw] text-center">
      <h1 className="mb-5 bg-gradient-to-tr from-neutral-100 to-neutral-600 bg-clip-text text-7xl font-bold text-transparent">
        Pick users
      </h1>
      <Link
        className="text-neutral-500 underline underline-offset-4 transition-colors hover:text-neutral-400"
        target="_blank"
        href={`https://imbharath.tech/?utm_source=pick-users-zepto-assignment`}>
        &copy; Bharath Lakshman Kumar
      </Link>
    </div>
    <div className="relative mx-auto flex min-h-[76px] w-fit min-w-[420px] max-w-[50dvw] rounded-lg border border-neutral-700 bg-neutral-800 p-2 text-sm shadow-inner outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50">
      <div className="bg-glare absolute inset-x-0 top-0 h-px opacity-20" />
      <div className="bg-glare absolute inset-x-0 bottom-0 h-px opacity-20" />
      <PickUsers />
    </div>
  </main>
);

export default Home;
