import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="flex items-center flex-col gap-6 justify-center min-h-[100vh] w-full bg-[url('/depht.jpg')] bg-no-repeat bg-center bg-cover">
        <h1 className="w-max text-6xl font-bold text-white">Bienvenue.</h1>
        <p className="text-white font-semibold text-center">
          Cette application est faite pour la gestion des equipements resaux.
        </p>
        <Link
          href={"/auth/login"}
          className="buttonGradient w-max py-2 px-6 rounded-xl text-textWhite font-medium"
        >
          Se connecter
        </Link>
      </div>
    </>
  );
}
