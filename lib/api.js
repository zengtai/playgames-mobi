import { API_URL, GAME_PATH } from "./constants";
import { SELECTED_GAMES, EXCLUDED_GAMES } from "./constants";
import { localData } from "../data/games.js";

async function fetchAPI(url) {
  const res = await fetch(url);
  const json = await res.json();

  if (json.errors) {
    console.error(json.errors);
    throw new Error(`Failed to fetch API`);
  }

  return json;
}

function toTitle(name) {
  return name
    .replace(/([A-Z])/g, " $1")
    .trim()
    .replace(/3 D/g, " 3D")
    .replace(/([A-Za-z])([0-9])/g, "$1 $2");
}

function toSlug(name) {
  return name.replace(/\s+/g, "-").toLowerCase();
}

function toFormat(name) {
  return name
    .trim()
    .toLowerCase()
    .replace(/^\S/, (s) => s.toUpperCase());
}

export async function getGames() {
  // const data = await fetchAPI(API_URL).then((res) => res.gamelist);
  let data = localData.gamelist;
  // 默认按日期排序
  let games = data.sort((a, b) =>
    new Date(a.time) < new Date(b.time) ? 1 : -1
  );

  // fix
  games.map((game) => {
    game.name == "WoodisLand" ? (game.name = "WoodIsland") : game.name;
    game.name == "SharkisComing" ? (game.name = "SharkIsComing") : game.name;
  });

  // 如存在要筛选的游戏
  if (SELECTED_GAMES.length)
    games = games.filter((game) => SELECTED_GAMES.includes(game.name));

  // 如存在要排除的游戏
  if (EXCLUDED_GAMES)
    games = games.filter((game) => !EXCLUDED_GAMES.includes(game.name));

  let basicData = [];
  let categories = [];

  // 设置 title / slug / url / 格式化category
  games.map((game) => {
    game["title"] = toTitle(game.name);
    game["slug"] = toSlug(game.title);
    game["url"] = `${GAME_PATH}${game.name}`;
    game["category"] =
      game.category.toLowerCase() == `puzzles`
        ? `Puzzle`
        : toFormat(game.category);
    game[
      "icon"
    ] = `https://cdn.iwantalipstick.com/gameicon2/jpg/${game.name}.jpg`;
  });

  // 添加附加属性
  games.map((game) => {
    game["stars"] = getStars();
    game["played"] = getCount();
  });

  // 生成包含基础属性的数组
  games.map((game) => {
    // 写入数组
    basicData.push({
      id: game.id,
      title: game.title,
      slug: game.slug,
      icon: game.icon,
      name: game.name,
      stars: game.stars,
      category:
        game.category.toLowerCase() == `puzzles` ? `Puzzle` : game.category,
    });
    // 写入分类名称
    !categories.includes(game.category) ? categories.push(game.category) : null;
  });

  return { games, basicData, categories };
}

// 获取分类游戏
export async function getGamesByCategory(category) {
  const games = await getGames().then((res) => res.basicData);
  return games.filter((game) => game.category.toLowerCase() === category);
}

// 按 slug 获取游戏信息
export async function getGameBySlug(slug) {
  const game = await getGames()
    .then((res) => res.games)
    .then((res) => res.filter((game) => game.slug == slug));
  return game;
}

// 生成模拟数据
function getRange(m, n, o) {
  let min = m;
  let max = n;
  let range = max - min;
  return o
    ? ((Math.random() * range + min) * o).toFixed(1)
    : (Math.random() * range + min).toFixed(1);
}

function getStars(level) {
  if (level !== undefined) {
    if (level == "latest") return getRange(4, 4.8);
    else if (level == "featured") return getRange(4.5, 5);
  } else return getRange(4.1, 4.5);
}

function getCount(level) {
  let latest = 1;
  let normal = 2;
  let featured = 3;
  if (level !== undefined) {
    if (level == "latest") {
      return getRange(10, 50, latest) + `k`;
    } else if (level == "featured") {
      return getRange(110, 200, featured) + `k`;
    }
  } else {
    return getRange(60, 100, normal) + `k`;
  }
}
