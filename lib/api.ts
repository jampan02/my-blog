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
  category: string;
  content: string;
  date: string;
  categoryPath: string;
  id: string;
};

export const getPostBySlug = (slugArray: string[]) => {
  const categoryInEnglish = slugArray[0];
  const id = slugArray[slugArray.length - 1];
  const category = getCategory(categoryInEnglish);
  const slugPath = slugArray.join("/");
  const slugFullPath = path.join(DIR, `/${slugPath}.md`);
  console.log("slugFullPath=", slugFullPath);
  const fileContent = fs.readFileSync(slugFullPath, "utf8");
  const { data, content } = matter(fileContent);
  const date = getDate(data["date"]);
  const categoryPath = categoryInEnglish;
  console.log("huga=", categoryPath);
  const title = data["title"];
  const description = data["description"];
  const keyword = data["keyword"];
  const image = data["image"];
  const url = data["url"];
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
  category: string;
  categoryPath: string;
};

//カテゴリ内投稿取得関数
export const getPostsByCategory = (category: string) => {
  let items: CategoryProps = { data: [], category: "", categoryPath: "" };
  const categoryPath = path.join(DIR, `/${category}/`);
  const allNames = fs.readdirSync(categoryPath);
  const realCategory = getCategory(category);
  for (let i = 0; i < allNames.length; i++) {
    console.log("fulklpaht=", `${categoryPath}${allNames[i]}`);
    const fileContent = fs.readFileSync(
      `${categoryPath}${allNames[i]}`,
      "utf-8"
    );
    const { data } = matter(fileContent);
    const date = getDate(data["date"]);
    const title = data["title"];
    const image = data["image"];
    const id = allNames[i].replace(/\.md$/, "");
    console.log("id=", id);
    items.data.push({
      title,
      image,
      date,
      id,
    });
  }
  items.category = realCategory;
  items.categoryPath = category;
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
  category: string;
  date: string;
  id: string;
  categoryPath: string;
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
  let category: string = "";
  switch (english) {
    case "government":
      category = "政治";
      return category;

    case "technology":
      return (category = "テクノロジー");

    default:
      return (category = "");
  }
};

const getDatePath = (slugArray: string[]) => {
  const slugPath = slugArray.join("/");
  const slugFullPath = path.join(DIR, `/${slugPath}.md`);
  const fileContent = fs.readFileSync(slugFullPath, "utf8");
  const { data } = matter(fileContent);
  const date = data["date"];
  console.log("date=", date);
  let year = date.getFullYear();
  let month = (date.getMonth() < 9 ? "0" : "") + (date.getMonth() + 1);
  return [String(year), month as string];
};
