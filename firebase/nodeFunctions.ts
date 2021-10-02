import path from "path";
import { TextDecoder } from "text-encoding";
import { storageNode } from "./nodeApp";

export const getArticleText = async (fileName: string) => {
  if (!fileName.match(/posts/)) {
    //postsを含まない場合の処理
    fileName = `posts/${fileName}`;
  }
  try {
    const file = await getFile(fileName);

    if (!file) return;

    // ファイル読み込み
    // https://www.pnkts.net/node-js-gcs
    const data = await file.download();
    const contents = data[0];
    const textDecoder = new TextDecoder("utf-8");
    const text = textDecoder.decode(Uint8Array.from(contents).buffer);
    return text;
  } catch (error) {
    console.error({ error });
  }
};
export const getFilePathsArray = async () => {
  try {
    const bucket = storageNode.bucket(process.env.FIREBASE_STORAGE_BUCKET);
    const files = await bucket.getFiles();

    const result: string[][] = [];
    files[0].forEach((file) => {
      const filePath = file.name;
      if (path.extname(filePath).toLowerCase() === ".md") {
        const filePathArray = filePath.replace(/\.md$/, "").split("/");
        result.push(filePathArray);
      }
    });
    return result;
  } catch (error) {
    console.error({ error });
  }
};
export const getFilePaths = async () => {
  try {
    const bucket = storageNode.bucket(process.env.FIREBASE_STORAGE_BUCKET);
    const files = await bucket.getFiles();

    const result: string[] = [];
    files[0].forEach((file) => {
      const filePath = file.name;
      if (path.extname(filePath).toLowerCase() === ".md") {
        result.push(filePath);
      }
    });
    return result;
  } catch (error) {
    console.error({ error });
  }
};

const getFile = async (fileName: string) => {
  try {
    const bucket = await storageNode.bucket(
      process.env.FIREBASE_STORAGE_BUCKET
    );

    const files = await bucket.getFiles();

    return files[0].find((file) => {
      const filePath = file.name;

      return (
        path.extname(filePath).toLowerCase() === ".md" &&
        filePath.replace(/\.md$/, "") === fileName.replace(/\.md$/, "")
      );
    });
  } catch (error) {
    console.error({ error });
  }
};
export const getChildPostPaths = async (dirName: string[]) => {
  try {
    // backend,laravel,3 みたいなかんじになる

    const dirPath = `posts/${dirName.join("/")}/`;

    const bucket = storageNode.bucket(process.env.FIREBASE_STORAGE_BUCKET);
    const files = await bucket.getFiles({
      prefix: dirPath,
    });

    const result: string[] = [];
    files[0].forEach((file) => {
      const filePath = file.name;
      //filePathの最後が、同じだったら

      if (path.extname(filePath).toLowerCase() === ".md") {
        result.push(filePath);
      }
    });
    return result;
  } catch (error) {
    console.error({ error });
  }
};
export const getCategoryPaths = async () => {
  try {
    const bucket = storageNode.bucket(process.env.FIREBASE_STORAGE_BUCKET);
    const files = await bucket.getFiles();

    const result: string[][] = [];
    files[0].forEach((file) => {
      const filePath = file.name;
      if (path.extname(filePath).toLowerCase() !== ".md") {
        // fronted,react みたいなの返す
        const filePathArray = filePath.split("/");
        filePathArray.shift();
        filePathArray.pop();
        if (filePathArray[0]) {
          result.push(filePathArray);
        }
      }
    });
    return result;
  } catch (error) {
    console.error({ error });
  }
};
