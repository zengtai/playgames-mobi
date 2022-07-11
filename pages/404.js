import Layout from "../components/Layout";
import { getGames } from "../lib/api";

export default function custom404({ categories }) {
  return (
    <Layout items={categories}>
      <div className="relative z-30 mt-6 flex grow flex-col justify-center text-center text-white md:mt-0">
        <div className="relative z-20 grow bg-[#FF5321] p-6 before:absolute before:left-0 before:-top-3 before:z-10 before:h-10 before:w-full before:-skew-y-[3deg] before:bg-[#FF5321] after:absolute after:left-0 after:-bottom-3 after:z-0 after:h-10 after:w-full after:skew-y-[3deg] after:bg-[#FF5321] md:bg-transparent md:px-8 md:before:hidden md:after:hidden">
          <h1 className="relative z-20 my-4 mb-6 text-4xl font-semibold capitalize md:mb-4 md:text-3xl">
            404
          </h1>
          <p>Page not found</p>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps(params) {
  const categories = await getGames().then((res) => res.categories);
  return {
    props: {
      categories,
    },
  };
}
