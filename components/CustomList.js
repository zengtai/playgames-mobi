import ListItem from "./ListItem";
export default function CustomList({ title, games, icon, cols, className }) {
  const setCol = () => {
    if (cols == "2") return `grid-cols-2`;
    else if (cols == "3") return `grid-cols-3`;
    else if (cols == "5") return `grid-cols-5`;
    else return `grid-cols-4`;
  };

  return (
    <>
      <ul
        className={`grid ${setCol()} gap-3 py-3 sm:grid-cols-4 md:grid-cols-6 md:gap-6 xl:grid-cols-8 2xl:grid-cols-12`}

        // className={
        //   setCol()
        //     ? `grid grid-cols-${cols} sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-12 gap-3 p-2`
        //     : `grid grid-cols-4 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-12 gap-3 p-2`
      >
        <ListItem games={games} />
      </ul>
    </>
  );
}
