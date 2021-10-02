import fs from "fs";
import matter from "gray-matter";
import {
  GoogleTrentdsAPIContentType,
  GoogleTrentdsAPIType,
} from "../types/GoogleTrendsAPIType";
import { DetailContent, CategoryProps, POST } from "../types/BlogAPIType";
import {
  getArticleText,
  getChildPostPaths,
  getFilePaths,
  getFilePathsArray,
} from "../firebase/nodeFunctions";
const gt = require("google-trends-api");

export const getPostBySlug = async (slugArray: string[]) => {
  //"tex/sdfs"こんなんにする
  const id = slugArray[slugArray.length - 1];
  const slugPath = slugArray.join("/");
  const fileContent = await getArticleText(slugPath);
  if (fileContent) {
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
  }
};
//
export const getDatesPath = async () => {
  let allPostsData = [];
  const postNames = await getFilePathsArray();
  //全投稿取得
  if (postNames) {
    allPostsData = await postNames.map(async (names) => {
      const result = await getDatePath(names);
      return result;
    });

    const results = [];
    for (let i = 0; i <= allPostsData.length; i++) {
      //全ての投稿全部展開させる
      const data = await allPostsData[i];
      if (data) {
        results.push(data);
      }
    }
    return results;
  }
};

//月ごとのアーカイブ取得
export const getPostsByDate = async (date: string[]) => {
  const start = date[0];
  const end = date[date.length - 1];
  let items: POST[] = [];
  let allPostsData: DetailContent[] | undefined = [];
  const regexp = new RegExp(`^${start}/${end}+`);
  const postNames = await getFilePathsArray();
  //全投稿取得
  if (postNames) {
    const promisedAllPostsData = await postNames.map(async (names) => {
      const data = await getPostBySlug(names);

      return data;
    });
    for (let i = 0; i <= promisedAllPostsData.length; i++) {
      //全ての投稿全部展開させる
      const data = await promisedAllPostsData[i];
      if (data) {
        allPostsData.push(data);
      }
    }

    if (allPostsData) {
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
    }
  }
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
        case "aws":
          category = ["インフラ", "AWS"];
          return category;
      }
      category = ["その他"];
      return category;
    case "other":
      switch (path[1]) {
        case "workout":
          category = ["その他", "Workout"];
          return category;
      }
      category = ["その他"];
      return category;
    default:
      return (category = []);
  }
};

const getDatePath = async (slugArray: string[]) => {
  const slugPath = slugArray.join("/");
  const fileContent = await getArticleText(slugPath);
  if (fileContent) {
    const { data } = await matter(fileContent);
    const date = data["date"];

    let year = date.getFullYear();
    let month = (date.getMonth() < 9 ? "0" : "") + (date.getMonth() + 1);
    return [String(year), month as string];
  }
};

//トレンド取得
export const getPopularLibraries = async () => {
  const now = new Date();
  const lastWeek = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - 7
  );
  const lastMonth = new Date(
    now.getFullYear(),
    now.getMonth() - 1,
    now.getDate()
  );
  const lastYear = new Date(
    now.getFullYear() - 1,
    now.getMonth(),
    now.getDate()
  );
  const lastWeekData: GoogleTrentdsAPIContentType = await gt
    .interestOverTime({
      keyword: ["React.js", "Vue.js", "Angular.js"],
      startTime: lastWeek,
    })
    .then(function (res: string) {
      const json: GoogleTrentdsAPIType = JSON.parse(res);
      const jsonContent = json.default.timelineData;
      fs.writeFileSync("gt.json", JSON.stringify(json, undefined, 2));
      return jsonContent;
    })
    .catch(function (err: any) {
      console.log(err);
    });
  const lastMonthData: GoogleTrentdsAPIContentType = await gt
    .interestOverTime({
      keyword: ["React.js", "Vue.js", "Angular.js"],
      startTime: lastMonth,
    })
    .then(function (res: string) {
      const json: GoogleTrentdsAPIType = JSON.parse(res);
      const jsonContent = json.default.timelineData;
      return jsonContent;
    })
    .catch(function (err: any) {
      console.log(err);
    });
  const lastYearData: GoogleTrentdsAPIContentType = await gt
    .interestOverTime({
      keyword: ["React.js", "Vue.js", "Angular.js"],
      startTime: lastYear,
    })
    .then(function (res: string) {
      const json: GoogleTrentdsAPIType = JSON.parse(res);
      const jsonContent = json.default.timelineData;
      return jsonContent;
    })
    .catch(function (err: any) {
      console.log(err);
    });
  const data = {
    weekly: lastWeekData,
    monthly: lastMonthData,
    yearly: lastYearData,
  };

  return data;
};
function baseName(str: string) {
  var base = new String(str).substring(str.lastIndexOf("/") + 1);
  if (base.lastIndexOf(".") != -1)
    base = base.substring(0, base.lastIndexOf("."));
  return base;
}
export const getPostContent = async (slug: string) => {
  const basename = baseName(slug);

  const articleText = await getArticleText(slug);

  if (articleText) {
    const { data, content } = await matter(articleText);
    const date = getDate(data["date"]);
    const title = data["title"];

    const description = data["description"];
    const keyword = data["keyword"];
    const image = data["image"];
    const url = data["url"];
    const categoryPath = slug.split("/");
    categoryPath[categoryPath.length - 1] = basename;
    categoryPath.shift();
    const id = categoryPath[categoryPath.length - 1];
    const english = slug.split("/");
    english.pop();
    english.shift();
    const categoryInEnglish = english.join("/");

    const category = await getCategory(categoryInEnglish);

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
  }
};
export const getAllPosts = async () => {
  const postNames = await getFilePaths();
  //全投稿取得

  if (postNames) {
    const allPostsData = await postNames.map(async (names) => {
      const c = await getPostContent(names);

      return c;
    });

    if (allPostsData) {
      for (let i = 0; i <= allPostsData.length; i++) {
        //全ての投稿全部展開させる
        await allPostsData[i];
      }

      let items: POST[] = [];
      await allPostsData.map(async (postData) => {
        const g = await postData;
        g?.categoryPath.pop();
        if (g) {
          items.push({
            title: String(g.title),
            category: g.category,
            date: g.date,
            image: String(g.image),
            categoryPath: g.categoryPath,
            id: g.id,
          });
        }
      });

      items.sort(function (a, b) {
        if (a.date > b.date) {
          return -1;
        } else {
          return 1;
        }
      });

      return items;
    }
  }
};

//同類投稿取得
export const getSameCategoryPosts = async (slugs: string[]) => {
  const category = slugs.join("/");
  const childPostPaths = await getChildPostPaths(slugs);

  let items: CategoryProps = { data: [], category: [], categoryPath: [] };
  const realCategory = getCategory(category);

  if (childPostPaths) {
    const datas = await childPostPaths.map(async (path) => {
      const pathArray = path.split("/");
      pathArray.pop();
      pathArray.shift();
      const articleText = await getArticleText(path);

      if (articleText) {
        const { data } = await matter(articleText);
        const date = getDate(data["date"]);
        const title = data["title"];

        const image = data["image"];

        let idArray = path.split("/");
        const id = idArray[idArray.length - 1].replace(/\.md$/, "");
        return await {
          title,
          image,
          date,
          id,
        };
      }
    });

    for (let i = 0; i <= datas.length; i++) {
      //全ての投稿全部展開させる
      const data = await datas[i];
      if (data) {
        items.data.push(data);
      }
    }

    items.category = realCategory;
    //tech/pro >> ["tech","pro"]の形にする
    items.categoryPath = slugs;
    //日付ごとにソート
    items.data.sort(function (a, b) {
      if (a.date > b.date) {
        return -1;
      } else {
        return 1;
      }
    });

    return items;
  }
};

export const getPostsInsideBigCategory = async (slugs: string[]) => {
  const childPostPaths = await getChildPostPaths(slugs);

  if (childPostPaths) {
    let items = await childPostPaths.map(async (path) => {
      const articleText = await getArticleText(path);

      if (articleText) {
        const { data } = await matter(articleText);
        const date = getDate(data["date"]);
        const title = String(data["title"]);

        const image = String(data["image"]);

        //const categoryPath = path.split("/");
        const categoryPath = path
          .split("/")
          .slice(1, path.split("/").length - 1);
        const category = getCategory(categoryPath.join("/"));
        let idArray = path.split("/");
        const id = idArray[idArray.length - 1].replace(/\.md$/, "");
        return {
          title,
          image,
          date,
          id,
          categoryPath,
          category,
        };
      }
    });
    const category = slugs.join("/");
    let result: CategoryProps = { data: [], category: [], categoryPath: [] };
    const realCategory = getCategory(category);
    result.category = realCategory;
    //tech/pro >> ["tech","pro"]の形にする
    result.categoryPath = slugs;
    for (let i = 0; i <= items.length; i++) {
      //全ての投稿全部展開させる
      const data = await items[i];
      if (data) {
        result.data.push(data);
      }
    }
    result.data.sort(function (a, b) {
      if (a.date > b.date) {
        return -1;
      } else {
        return 1;
      }
    });

    return result;
  }
};
