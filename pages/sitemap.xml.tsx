import { GetServerSidePropsContext } from "next";
import { getAllPosts, getPostBySlug } from "../lib/api";

export const getServerSideProps = async ({
  res,
}: GetServerSidePropsContext) => {
  const xml = await generateSitemapXml(); // xmlコードを生成する処理（後で書く）

  res.statusCode = 200;
  res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate"); // 24時間のキャッシュ
  res.setHeader("Content-Type", "text/xml");
  res.end(xml);

  return {
    props: {},
  };
};

const Page = () => null;
export default Page;

const generateSitemapXml = async (): Promise<string> => {
  let xml = `<?xml version="1.0" encoding="UTF-8"?>`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
  // ここでurlを足していく
  const appHost = "https://frontedcode.com/";
  const list = await getAllPosts();
  const posts = list.map((path) => {
    return getPostBySlug(path);
  });
  posts.forEach((post) => {
    const postDate = post.date.replace(/\//g, "-");
    const postPath = post.categoryPath.join("/");
    xml += `
      <url>
        <loc>${appHost}${postPath}/${post.id}</loc>
        <lastmod>${postDate}</lastmod>
        <changefreq>weekly</changefreq>
      </url>
    `;
  });

  xml += `</urlset>`;
  return xml;
};
