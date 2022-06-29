import Layout from "../../components/Layout";
import List from "../../components/List";
import { useRouter } from "next/router";
import { getGamesByCategory, getCategories } from "../../lib/api";
import Head from "next/head";
import { SITE_NAME, CAT_ADS_ID } from "../../lib/constants";
import Adsense from "../../components/Adsense";

export default function GamesListByCategory({ games, categories }) {
  // console.log(games);
  const router = useRouter();
  const { slug } = router.query;
  // console.log(router.query);
  // console.log({ slug });
  const categoryName = slug.toString().replace(/^\S/, (s) => s.toUpperCase());
  // console.log(categoryName);
  return (
    <>
      <Layout items={categories} isOpen>
        <Head>
          <title>
            {categoryName} Games | Play {categoryName} Games on {SITE_NAME}
          </title>
        </Head>
        <div>
          {/* {games.length > 9 ? <Adsense slot={CAT_ADS_ID} /> : ``} */}
          <h1 className="relative z-20 my-4 mb-6 text-center text-xl font-semibold capitalize text-[#463838] md:mb-4 md:text-3xl">
            {categoryName} {games.length > 1 ? `Games` : `Game`} ({games.length}
            )
          </h1>
        </div>
        <div className="relative z-20 grow bg-[#FF5321] p-6 before:absolute before:left-0 before:-top-3 before:z-10 before:h-10 before:w-full before:-skew-y-[3deg] before:bg-[#FF5321] after:absolute after:left-0 after:-bottom-3 after:z-0 after:h-10 after:w-full after:skew-y-[3deg] after:bg-[#FF5321] md:bg-transparent md:px-8 md:before:hidden md:after:hidden">
          <List cols="3" games={games} />
        </div>
      </Layout>
    </>
  );
}

export async function getStaticProps(context) {
  const games = await getGamesByCategory(`${context.params.slug}`);
  const categories = await getCategories();

  return {
    props: {
      games,
      categories,
    },
    revalidate: 6000,
  };
}

export const getStaticPaths = async () => {
  const categories = await getCategories();
  const paths = categories.map((category) => ({
    params: {
      slug: category,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};
