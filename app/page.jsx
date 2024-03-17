import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex items-center flex-col gap-6 justify-center min-h-[100vh]">
        <h1 className="w-max text-6xl font-bold bgText">Bienvenue</h1>
        <Link
          href={"/home"}
          className="bg-gradient w-max py-2 px-6 rounded-md text-textWhite font-medium"
        >
          Visiter
        </Link>
      </div>
    </>
  );
}
