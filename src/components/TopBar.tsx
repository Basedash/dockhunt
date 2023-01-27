import dockhuntDarkBigSur from "images/Dockhunt-dark-bigsur.png";
import dockhuntDarkMojave from "images/Dockhunt-dark-mojave.png";
import dockhuntDarkVentura from "images/Dockhunt-dark-ventura.png";
import dockhuntLightBigSur from "images/dockhunt-light-bigsur.png";
import dockhuntLightVentura from "images/dockhunt-light-ventura.png";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

const images = [
  dockhuntDarkBigSur,
  dockhuntDarkMojave,
  dockhuntDarkVentura,
  dockhuntLightBigSur,
  dockhuntLightVentura
];

export const TopBar = () => {
  const [imgSrc, setImgSrc] = useState(dockhuntDarkBigSur);

  const cycleImage = () => {
    const index = images.indexOf(imgSrc);
    const nextIndex = index === images.length - 1 ? 0 : index + 1;
    setImgSrc(images[nextIndex]!);
  };

  return (<div className={"relative w-full flex items-start pt-4 px-4 justify-center"}>
    <div className={"absolute left-4 top-4"}>
      <AuthShowcase />
    </div>
    <h1 className="text-5xl font-extrabold sm:text-[5rem] pt-4">
      <Link href="/">
        <Image
          src={imgSrc}
          alt="Dockhunt logo"
          width={120}
          height={120}
          onMouseEnter={cycleImage}
        />
      </Link>
    </h1>
    <div className={"absolute right-4 top-4 flex"}>
      <Link
        href={"/new-dock?app=Notion&app=Slack&app=Basedash"}
        className={"bg-cyan-300 rounded-full px-8 py-2 font-semibold text-black transition hover:bg-cyan-200"}
      >
        Add your dock
      </Link>
    </div>
  </div>);
};

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="flex items-center justify-center gap-2">
      {sessionData && sessionData.user && (
        <Link href={`/users/${sessionData.user.username}`}>
          <Image
            // TODO: Use a default image for placeholder
            src={sessionData.user.image ?? ""}
            alt={`${sessionData.user.name} avatar`}
            className={"rounded-full"}
            width="30"
            height="30"
          />
        </Link>
      )}
      <button
        className="rounded-full bg-white/10 py-1 p-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={
          sessionData ? () => void signOut() : () => void signIn("twitter")
        }
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
