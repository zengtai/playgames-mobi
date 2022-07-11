import Image from "./Image";
import Link from "next/link";
import Head from "next/head";
import { SITE_META } from "../lib/constants";
import { starIcon } from "./Icons";

export default function Detail({ game }) {
  return (
    <>
      <Head>
        <title>{`Play ${game.title} on ${SITE_META.name}`}</title>
      </Head>
      <div className="flex flex-col items-center md:flex-row md:items-start">
        <div className="aspect-square h-24 w-24 shrink-0 md:h-40 md:w-40">
          <Image
            src={game.icon}
            alt={game.title}
            width={200}
            height={200}
            className="bg-loading w-full rounded-xl bg-black/10 bg-center bg-no-repeat"
            layout="responsive"
          />
        </div>
        <div className="text-center md:px-5 md:text-left">
          <h1 className="py-2 text-xl font-semibold md:text-3xl">
            <span>{game.title}</span>
          </h1>
          <p className="capitalize">
            <Link href={`/category/${game.category.toLowerCase()}`}>
              <a className="rounded-md bg-lime-500 py-1 px-2 text-xs text-white shadow-md shadow-lime-500/10">
                {game.category.toLowerCase()}
              </a>
            </Link>
          </p>
          <p className="mt-3 flex flex-row items-center justify-center space-x-3 md:justify-start">
            <span className="text-2xl font-bold">
              <span className="flex flex-row items-center text-orange-500">
                <span>{starIcon()}</span>
                {game.stars}
              </span>
            </span>
            <span className="opacity-50">{game.played} played</span>
          </p>
          <p className="py-4 md:pt-4">
            <Link href={game.url}>
              <a
                className="mx-auto block rounded-full bg-sky-500 p-3 text-center text-lg font-semibold text-white shadow-xl shadow-sky-600/20 transition-transform duration-300 ease-in-out md:w-96 md:hover:scale-110 md:hover:shadow-2xl md:hover:shadow-sky-900/40 md:hover:delay-100 lg:p-4 lg:text-2xl"
                title={`Play ${game.title} now`}
              >
                PLAY NOW
              </a>
            </Link>
          </p>
          <p className="py-3 text-left text-sm text-[#463838cc] md:text-sm">
            {game.description}
          </p>
        </div>
      </div>
    </>
  );
}
