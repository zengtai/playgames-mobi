import Head from "next/head";
import { useState } from "react";
import {
  fireIcon,
  hotIcon,
  topIcon,
  gameIcon,
  categoryIcon,
  starIcon,
  triIcon,
} from "../components/Icons";
import { getGames, getCategories } from "../lib/api";
import Link from "next/link";
import Image from "../components/Image";
import Layout from "../components/Layout";
import { SITE_NAME, HOME_ADS_ID } from "../lib/constants";
import List from "../components/List";
import Adsense from "../components/Adsense";
import InfiniteScroll from "react-infinite-scroll-component";
import Category from "../components/Category";
import ListItem from "../components/ListItem";

export default function Home({ games, newGames, featuredGames, categories }) {
  const initGames = games.slice(0, 60);
  const total = games.length;

  const [scrollGames, setScrollGames] = useState(initGames);
  const [hasMore, setHasMore] = useState(true);

  const getMoreGames = () => {
    const newScrollGames = games.slice(
      scrollGames.length,
      scrollGames.length + 12
    );
    setScrollGames((game) => [...game, ...newScrollGames]);

    if (scrollGames.length >= total) {
      setHasMore(!hasMore);
    }
  };

  return (
    <>
      <Layout items={categories}>
        <Head>
          <title>{SITE_NAME} | Play Free Games Online</title>
        </Head>
        <div className="grow">
          <div className="relative bg-orange-600 md:hidden md:bg-transparent">
            <h2 className="relative z-10 flex items-center space-x-2 bg-[#FFB03A] p-4 font-semibold text-[#463838] before:absolute before:left-0 before:-top-6 before:-z-10 before:h-12 before:w-full before:skew-y-6 before:bg-[#FFF9DB] after:absolute after:left-0 after:-bottom-4 after:z-40 after:h-10 after:w-full after:-skew-y-6 after:bg-[#C84B26] md:bg-transparent md:text-lg md:before:hidden md:after:hidden">
              <span>{fireIcon()}</span>
              <span>Popular</span>
            </h2>
            <ul
              className={`relative grid grid-cols-3 gap-3 bg-[#FF5321] py-3 px-6 before:absolute before:left-0 before:-top-4 before:z-40 before:h-10 before:w-full before:-skew-y-[4deg] before:bg-[#FF5321] after:absolute after:left-0 after:-bottom-4 after:z-40 after:h-10 after:w-full after:skew-y-[3deg] after:bg-[#FF5321] sm:grid-cols-4 md:grid-cols-6 md:gap-6 md:px-8 md:pb-8 md:before:hidden md:after:hidden xl:grid-cols-8 2xl:grid-cols-12`}
            >
              <ListItem games={featuredGames} className="relative z-50" />
            </ul>
          </div>

          {/* <Adsense slot={HOME_ADS_ID} /> */}

          <div className="mt-8 mb-6 md:my-2">
            <h2 className="relative z-20 flex items-center space-x-2 px-4 pb-0 font-semibold text-[#463838] md:px-8 md:text-lg">
              <span>{gameIcon()}</span>
              <span>All Games ({total})</span>
            </h2>
            <InfiniteScroll
              style={{ overflow: "visible" }}
              dataLength={scrollGames.length}
              next={getMoreGames}
              hasMore={hasMore}
              loader={
                <div className="my-2 text-center text-[#463838]">
                  Loading...
                </div>
              }
            >
              <ul className="relative z-20 grid grid-cols-4 gap-3 py-3 px-6 md:grid-cols-6 md:gap-6 md:px-8 xl:grid-cols-8 2xl:grid-cols-12">
                {scrollGames.map((game, index) => {
                  return (index - 2) % 11 == 0 ? (
                    <li
                      key={game.id}
                      className="md:second:col-auto col-span-2 row-span-2 md:row-auto"
                    >
                      <Link href={`/game/${game.slug}`}>
                        <a className="group md:delay-50 duration-400 relative block aspect-square overflow-hidden rounded-2xl shadow-md shadow-black/30 transition ease-in-out hover:shadow-lg hover:shadow-black/40 md:hover:origin-bottom md:hover:scale-110">
                          <Image
                            src={game.icon}
                            alt={game.title}
                            width={200}
                            height={200}
                            layout="responsive"
                            className="bg-loading w-full bg-center bg-no-repeat"
                          />
                          <div className="absolute bottom-0 flex h-full w-full items-end justify-center bg-gradient-to-t from-black to-black/0 text-center text-xs font-semibold md:-bottom-[150%] md:group-hover:bottom-0">
                            <div className="h-auto w-full text-ellipsis p-2 text-center">
                              <h3 className="text-sm leading-4">
                                {game.title}
                              </h3>
                              <p className="flex flex-row items-center justify-center text-xl font-bold text-orange-500">
                                {starIcon()}
                                {game.stars}
                              </p>

                              <div className="mx-4 mt-2 flex items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-yellow-400 px-4 py-2 uppercase md:hidden">
                                {triIcon()}
                              </div>
                            </div>
                          </div>
                        </a>
                      </Link>
                    </li>
                  ) : (
                    <li
                      key={game.id}
                      className="second:col-span-2 md:second:col-auto second:row-span-2 md:second:row-auto"
                    >
                      <Link href={`/game/${game.slug}`}>
                        <a className="group md:delay-50 duration-400 relative block aspect-square overflow-hidden rounded-2xl shadow-md shadow-black/30 transition ease-in-out hover:shadow-lg hover:shadow-black/40 md:hover:origin-bottom md:hover:scale-110">
                          <Image
                            src={game.icon}
                            alt={game.title}
                            width={200}
                            height={200}
                            layout="responsive"
                            className="bg-loading w-full bg-center bg-no-repeat"
                          />
                          <div className="absolute -bottom-[150%] hidden h-full w-full items-end justify-center text-center text-xs font-semibold group-hover:bg-gradient-to-t group-hover:from-black group-hover:to-black/0 sm:flex md:group-hover:bottom-0">
                            <div className="h-auto w-full text-ellipsis p-2 text-center">
                              <h3 className="leading-4">{game.title}</h3>
                              <p className="flex flex-row items-center justify-center text-xl font-bold text-orange-500">
                                {starIcon()}
                                {game.stars}
                              </p>
                            </div>
                          </div>
                        </a>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </InfiniteScroll>
          </div>
          <div className="relative bg-[#FF5321] before:absolute before:left-0 before:-top-3 before:z-10 before:h-10 before:w-full before:-skew-y-[3deg] before:bg-[#FF5321] after:absolute after:left-0 after:-bottom-3 after:z-0 after:h-10 after:w-full after:skew-y-[3deg] after:bg-[#FF5321] md:bg-transparent md:before:hidden md:after:hidden">
            <Category
              icon={categoryIcon()}
              title="Categories"
              categories={categories}
            />
          </div>
        </div>
      </Layout>
    </>
  );
}

export const getStaticProps = async () => {
  // const games = await getGames();
  const games = await getGames();
  const newGames = await getGames("LATEST", 12);
  const featuredGames = await getGames("FEATURED_GAMES");
  const categories = await getCategories();

  return {
    props: {
      games,
      newGames,
      featuredGames,
      categories,
    },
    revalidate: 6000,
  };
};
