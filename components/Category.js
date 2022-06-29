import Link from "next/link";
export default function Category({ title, categories, icon }) {
  const categoryList = categories.map((category, index) => (
    <li key={index} className="mb-2 basis-1/3 capitalize md:basis-1/12 xl:mx-2">
      <Link href={`/category/${category}`}>
        <a className="mx-2 block rounded-full bg-[#FFB03A] py-2 px-2 text-center text-sm text-yellow-800  shadow-md shadow-yellow-700 transition duration-300 ease-in-out hover:scale-110 md:px-3">
          {category}
        </a>
      </Link>
    </li>
  ));
  if (categories.length != 0)
    if (title === undefined) {
      return (
        <>
          <ul className="flex space-x-3 p-4">{categoryList}</ul>
        </>
      );
    } else {
      return (
        <>
          <h2 className="relative z-20 flex items-center space-x-2 px-4 pt-4 pb-0 font-semibold text-[#463838] md:text-lg">
            <span>{icon}</span>
            <span>{title}</span>
          </h2>
          <ul className="relative z-20 flex flex-wrap px-3 py-3 md:px-6 xl:py-4">
            {categoryList}
          </ul>
        </>
      );
    }
  else {
    return <></>;
  }
}
