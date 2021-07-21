import path from "path";
import glob from "glob";
import fs from "fs";
import matter from "gray-matter";
const postDirPrefix = "content/posts/";
const DIR = path.join(process.cwd(), "content/posts");

export const getAllPosts = () => {
  const fileNamePath = glob.sync(`${postDirPrefix}/**/*.md`);
  const fileName = fileNamePath
    .map((file) => file.split(postDirPrefix).pop())
    .map((slug) => String(slug).replace(/\.md$/, "").split("/"));
  return fileName;
};

export type DetailContent = {
  title: any;
  description: any;
  keyword: any;
  image: any;
  url: any;
  category: string[];
  content: string;
  date: string;
  categoryPath: string[];
  id: string;
};

export const getPostBySlug = (slugArray: string[]) => {
  //"tex/sdfs"こんなんにする
  const id = slugArray[slugArray.length - 1];
  const slugPath = slugArray.join("/");
  const slugFullPath = path.join(DIR, `/${slugPath}.md`);
  const fileContent = fs.readFileSync(slugFullPath, "utf8");
  const { data, content } = matter(fileContent);
  const date = getDate(data["date"]);
  const title = data["title"];
  const description = data["description"];
  const keyword = data["keyword"];
  const image = data["image"];
  const url = data["url"];
  const categoryPath = slugArray;
  slugArray.pop();
  const categoryInEnglish = slugArray.join("/");
  const category = getCategory(categoryInEnglish);
  const items: DetailContent = {
    title,
    description,
    keyword,
    image,
    url,
    category,
    content,
    date,
    categoryPath,
    id,
  };

  return items;
};

export type CategoryProps = {
  data: {
    title: string;
    date: string;
    id: string;
    image: string;
  }[];
  category: string[];
  categoryPath: string[];
};

//カテゴリ内投稿取得関数
export const getPostsByCategory = (slugs: string[]) => {
  let category: string;
  if (Array.isArray(slugs)) {
    //配列だったら

    category = slugs.join("/");
  } else {
    category = slugs;
  }

  let items: CategoryProps = { data: [], category: [], categoryPath: [] };
  const categoryPath = path.join(DIR, `/${category}/`);

  const allNames = fs.readdirSync(categoryPath);

  const results = getMakePath(allNames, category) as string[];
  const realCategory = getCategory(category);
  for (let i = 0; i < results.length; i++) {
    const fileContent = fs.readFileSync(
      `${categoryPath}${results[i]}`,
      "utf-8"
    );
    const { data } = matter(fileContent);
    const date = getDate(data["date"]);
    const title = data["title"];
    const image = data["image"];
    const id = results[i].replace(/\.md$/, "");

    items.data.push({
      title,
      image,
      date,
      id,
    });
  }
  items.category = realCategory;
  //tech/pro >> ["tech","pro"]の形にする
  items.categoryPath = category.split("/");
  //日付ごとにソート
  items.data.sort(function (a, b) {
    if (a.date > b.date) {
      return -1;
    } else {
      return 1;
    }
  });

  return items;
};

export type POSTS = {
  title: string;
  image: string;
  category: string[];
  date: string;
  id: string;
  categoryPath: string[];
};
//全件取得
export const getPosts = () => {
  let items: POSTS[] = [];
  let allPostsData: DetailContent[] = [];
  const postNames = getAllPosts();
  //全投稿取得
  allPostsData = postNames.map((names) => {
    return getPostBySlug(names);
  });
  items = allPostsData.map((postData) => {
    return {
      title: postData.title,
      category: postData.category,
      date: postData.date,
      image: postData.image,
      id: postData.id,
      categoryPath: postData.categoryPath,
    };
  });
  items.sort(function (a, b) {
    if (a.date > b.date) {
      return -1;
    } else {
      return 1;
    }
  });
  console.log(items);
  return items;
};

//返り血は、[[2020,3]]　みたいな感じ

//
export const getDatesPath = () => {
  let allPostsData = [];
  const postNames = getAllPosts();
  //全投稿取得
  allPostsData = postNames.map((names) => {
    return getDatePath(names);
  });

  return allPostsData;
};

//月ごとのアーカイブ取得
export const getPostsByDate = (date: string[]) => {
  const start = date[0];
  const end = date[date.length - 1];
  let items: POSTS[] = [];
  let allPostsData: DetailContent[] = [];
  const regexp = new RegExp(`^${start}/${end}+`);
  const postNames = getAllPosts();
  //全投稿取得
  allPostsData = postNames.map((names) => {
    return getPostBySlug(names);
  });
  items = allPostsData.map((postData) => {
    return {
      title: postData.title,
      image: postData.image,
      category: postData.category,
      date: postData.date,
      id: postData.id,
      categoryPath: postData.categoryPath,
    };
  });

  items = items.filter((item) => {
    const result = item.date.match(regexp);
    return Boolean(result);
  });

  items.sort(function (a, b) {
    if (a.date > b.date) {
      return -1;
    } else {
      return 1;
    }
  });

  return { items, date };
};

//日付取得関数
const getDate = (date: Date) => {
  if (!(date instanceof Date)) {
    return "";
  }

  let year = date.getFullYear();
  let month = (date.getMonth() < 9 ? "0" : "") + (date.getMonth() + 1);
  let day = (date.getDate() < 10 ? "0" : "") + date.getDate();

  return `${year}/${month}/${day}`;
};

//カテゴリー取得
const getCategory = (english: string) => {
  const path = english.split("/");
  let category: string[] = [];
  switch (path[0]) {
    case "backend":
      switch (path[1]) {
        case "firebase":
          category = ["バックエンド", "Firebase"];
          return category;
        case "laravel":
          category = ["バックエンド", "Laravel"];
          return category;
      }
      category = ["バックエンド"];
      return category;
    case "frontend":
      switch (path[1]) {
        case "react":
          category = ["フロントエンド", "React"];
          return category;
        case "javascript":
          category = ["フロントエンド", "Javascript"];
          return category;
        case "html":
          category = ["フロントエンド", "HTML"];
          return category;
        case "css":
          category = ["フロントエンド", "CSS"];
          return category;
      }
      category = ["フロントエンド"];
      return category;
    case "infrastructure":
      switch (path[1]) {
        case "docker":
          category = ["インフラ", "Docker"];
          return category;
      }
      category = ["インフラ"];
      return category;
    default:
      return (category = []);
  }
};

const getDatePath = (slugArray: string[]) => {
  const slugPath = slugArray.join("/");
  const slugFullPath = path.join(DIR, `/${slugPath}.md`);
  const fileContent = fs.readFileSync(slugFullPath, "utf8");
  const { data } = matter(fileContent);
  const date = data["date"];

  let year = date.getFullYear();
  let month = (date.getMonth() < 9 ? "0" : "") + (date.getMonth() + 1);
  return [String(year), month as string];
};

const getMakePath = (items: string[], huga: string) => {
  //カテゴリ取得
  const pattern = /\.md$/;
  let folders: string[] = [];
  const defaultPaths = items.map((name) => {
    //フォルダだった場合
    if (!pattern.test(name)) {
      folders.push(name);
      return;
    } else {
      return name;
    }
  });
  //二層目
  const paths = folders.map((name) => {
    const fullPath = path.join(DIR, `/${huga}/${name}/`);
    const fileNames = fs.readdirSync(fullPath);
    return fileNames.map((fileName) => {
      return `${name}/${fileName}`;
    });
  });

  let array1d = [];
  for (let array of paths) {
    for (let result of array) {
      array1d.push(result);
    }
  }
  const results = array1d.map((data) => {
    //フォルダだった場合
    if (!pattern.test(data)) {
      folders.push(data);
      return;
    }
    return data;
  });

  const hoge = defaultPaths.concat(results as string[]);

  const allPaths = hoge.filter((item) => {
    return item !== undefined;
  });
  return allPaths;
  //*二層目までしか対応していない
};
