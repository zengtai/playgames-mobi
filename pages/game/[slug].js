import Layout from "../../components/Layout";
import { useRouter } from "next/router";
import { getCategories, getGames } from "../../lib/api";
import Detail from "../../components/Detail";
import ListItem from "../../components/ListItem";
import Link from "next/link";
import Banner from "../../components/Banner";
import { DETAIL_ADS_ID } from "../../lib/constants";
import { sparklesIcon } from "../../components/Icons";

export default function Games({
  game,
  categories,
  leftGames,
  rightGames,
  bottomGames,
}) {
  // console.log(game);
  const router = useRouter();
  const { slug } = router.query;

  const AsideGameList = ({ games }) => {
    return (
      <ul className="grid w-full grid-cols-5 gap-3 md:grid-cols-10 md:gap-6 xl:grid-cols-2">
        <ListItem games={games} />
      </ul>
    );
  };

  return (
    <>
      <Layout items={categories}>
        <div className="relative z-30 mt-6 grow md:mt-0">
          <div className="relative z-30 grid grow gap-3 bg-[#FF5321] p-4 before:absolute before:left-0 before:-top-3 before:z-10 before:h-10 before:w-full before:-skew-y-[3deg] before:bg-[#FF5321] after:absolute after:left-0 after:-bottom-3 after:z-0 after:h-10 after:w-full after:skew-y-[3deg] after:bg-[#FF5321] md:gap-6 md:bg-transparent md:p-8 md:before:hidden md:after:hidden xl:grid-cols-12 xl:grid-rows-5">
            <div className="relative z-30 rounded-xl bg-white p-5 text-[#463838] shadow-lg shadow-black/10 xl:col-span-8 xl:col-start-3 xl:row-span-3 xl:row-start-1">
              <div className="flex origin-left scale-90 flex-row space-x-2 pb-4 text-sm text-[#463838]">
                <Link href={`/`}>Home</Link>
                <span className="opacity-50">/</span>
                <Link href={`/category/${game.category.toLowerCase()}`}>
                  <a title={game.category}>
                    {game.category.replace(
                      game.category[0],
                      game.category[0].toUpperCase()
                    )}
                  </a>
                </Link>
                <span className="opacity-50">/</span>
                <span className="opacity-50">{game.title}</span>
              </div>
              <Detail game={game} />
            </div>
            <h3 className="mt-2 flex flex-row text-lg font-semibold text-[#463838] xl:sr-only">
              <span className="mr-1">{sparklesIcon()}</span>
              You may also like
            </h3>
            <div className="flex items-end xl:col-span-2 xl:col-start-1 xl:row-span-5 xl:row-start-1">
              {/* <Adsense height={`h-[200px] md:h-[200px] xl:h-[200px]`} wFull /> */}
              <AsideGameList games={leftGames} />
            </div>
            <div className="flex items-end xl:col-span-2 xl:col-start-11 xl:row-span-5 xl:row-start-1">
              <AsideGameList games={rightGames} />
            </div>
            <div className="relative z-30 items-end xl:col-span-8 xl:col-start-3 xl:row-span-2 xl:row-start-4">
              <ul className="grid grid-cols-5 gap-3 md:grid-cols-10 md:gap-6 xl:grid-cols-8">
                <ListItem games={bottomGames} />
              </ul>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export async function getStaticProps(context) {
  let data = await getGames();
  const categories = data.categories;
  let game = data.games.filter((game) => game.slug == context.params.slug);
  // console.log(game);
  let relatedGames = data.basicData.filter(
    (game) => game.slug !== context.params.slug
  );
  return {
    props: {
      game: game[0],
      categories,
      rightGames: relatedGames.slice(0, 10),
      leftGames: relatedGames.slice(11, 21),
      bottomGames: relatedGames.slice(22, 38),
    },
    revalidate: 6000,
  };
}

export const getStaticPaths = async () => {
  const games = await getGames().then((res) => res.basicData);
  const paths = games.map((game) => ({
    params: {
      slug: game.slug,
    },
  }));
  return {
    paths,
    fallback: false,
  };
};
