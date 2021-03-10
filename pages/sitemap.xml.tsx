import { GetServerSidePropsContext } from "next";
import { getPosts } from "../lib/api";

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
  const appHost = "https://frontedcode.com/";
  // ここでurlを足していく
  const posts = await getPosts();
  posts.forEach((post) => {
    const postPath = post.categoryPath.join("/");
    const postDate = post.date.replace("/", "-");
    xml += `
      <url>
        <loc>${appHost}${postPath}</loc>
        <lastmod>${postDate}</lastmod>
        <changefreq>weekly</changefreq>
      </url>
    `;
  });

  xml += `</urlset>`;
  return xml;
};
