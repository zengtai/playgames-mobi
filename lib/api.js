import {
  API_URL,
  SELECTED_GAMES,
  EXCLUED_GAMES,
  FEATURED_GAMES,
  GAME_PATH,
} from "./constants";
import { toTitle, toSlug, getCount, getStars } from "../utils/generator";
import {
  iconAction,
  iconCasual,
  iconDefense,
  iconPuzzles,
  iconShooting,
  iconSimulation,
  iconSports,
  iconStrategy,
} from "../components/Icons";

async function fetchAPI() {
  const json = await fetch(API_URL).then((res) => res.json());

  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }
  // console.log(json);
  return json.gamelist; // 返回游戏列表
}

export async function getGames(type, limit) {
  const data = await fetchAPI();
  // console.log(data);
  let gamesName = [];
  data.map((game) => gamesName.push(game.name)); // 存储所有游戏名称
  data.sort((a, b) => (new Date(a.time) < new Date(b.time) ? 1 : -1)); // 按时间排序

  /* data.sort((a, b) => (a.name > b.name ? 1 : -1)); // 按名称排序 */

  data.map((game) => {
    game["stars"] = getStars();
    game["played"] = getCount();
  });

  let games = []; // 创建临时数组

  if (SELECTED_GAMES.length != 0) {
    //

    console.log(SELECTED_GAMES.filter((name) => !gamesName.includes(name))); // 检查名称是否出错
    games = data.filter((game) => SELECTED_GAMES.includes(game.name));
  } else if (EXCLUED_GAMES.length != 0) {
    //
    console.log(EXCLUED_GAMES.filter((name) => !gamesName.includes(name))); // 检查名称是否出错
    games = data.filter((game) => !EXCLUED_GAMES.includes(game.name));
  } else {
    games = data;
  }

  if (FEATURED_GAMES.length != 0 && type == "FEATURED_GAMES") {
    //
    console.log(FEATURED_GAMES.filter((name) => !gamesName.includes(name))); // 检查名称是否出错
    games = data.filter((game) => FEATURED_GAMES.includes(game.name));
    if (limit !== undefined) {
      games = games.slice(0, limit);
    }
    games.map((game) => {
      game["featured"] = true;
      game["stars"] = getStars("featured");
      game["played"] = getCount("featured");
    });
  }

  if (type == "LATEST") {
    games.sort((a, b) => (a.time < b.time ? 1 : -1));
    if (limit != undefined) {
      games = games.slice(0, limit);
      games.map((game) => {
        game["stars"] = getStars("latest");
        game["played"] = getCount("latest");
      });
    } // 唯一参数为数字
  }

  /* games.map((game) => {
    (game["url"] = `${GAME_PATH}${game.name}`),
      (game["title"] = `${toTitle(game.name)}`),
      (game["slug"] = `${toSlug(game.name)}`);
  }); // 设置游戏路径、标题、slug */

  games.map((game) => (game["url"] = `${GAME_PATH}${game.name}`)); // 设置游戏路径
  games.map((game) => (game["title"] = `${toTitle(game.name)}`)); // 设置游戏标题
  games.map((game) => (game["slug"] = `${toSlug(game.name)}`)); // 设置游戏slug

  games.map(
    (game) => (game["category"] = `${game.category.trim().toLowerCase()}`)
  ); // 修复分类命名错误问题

  games.map((game) =>
    game.name.toLowerCase == "woodisland" ? (game.name = "WoodIsland") : null
  );

  games = games.filter((game) => new Date(game.time) < new Date(`2022-06-16`));

  return games;
}

export async function getCategories() {
  const games = await getGames();
  let categories = games.map((game) => game.category);
  categories = [...new Set(categories)];
  categories = categories.sort();
  return categories;
}

export async function getGamesByCategory(genre) {
  let games = await getGames();
  games = games.filter(
    (game) => game.category.toLowerCase() == genre.toLowerCase()
  );
  // console.log(games);

  return games;
}

export function getIcon(genre) {
  const categoryIcons = {
    action: iconAction(),
    casual: iconCasual(),
    defense: iconDefense(),
    puzzles: iconPuzzles(),
    shooting: iconShooting(),
    simulation: iconSimulation(),
    sports: iconSports(),
    strategy: iconStrategy(),
  };
  return categoryIcons[genre];
}

// export async function getGamesSlugs(slug) {
//   const games = await getGames();

//   // slugs = games.map((game) => game.name.replace(/A-Z/g, " $1"));

//   return games.map((game) => {
//     return {
//       params: {
//         slug: game
//           .replace(/([A-Z])/g, " $1")
//           .trim()
//           .replace(/3 D/g, "3D"),
//       },
//     };
//   });
// }
