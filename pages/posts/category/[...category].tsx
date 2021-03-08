import { GetStaticPaths } from "next";
import {
  CategoryProps,
  getAllPosts,
  getPostsByCategory,
} from "../../../lib/api";
import Layout from "../../../components/Layout";
import Link from "next/link";
import Head from "../../../components/head";

const Category = ({ contents }: { contents: CategoryProps }) => {
  console.log("C=", contents);
  return (
    <Layout>
      <Head title={`${contents.category}に関する投稿一覧`} />
      <p className="contents_header">{`${contents.category}に関する投稿一覧`}</p>
      {contents.data.map((content: any) => (
        <Link
          href="/posts/[category]/[id]"
          as={`/posts/${contents.categoryPath}/${content.id}`}
          key={`${contents.categoryPath}/${content.id}`}
        >
          <a>
            <div className="contents_container">
              <img src={content.image} />
              <div>
                <p className="contents_container_title">{content.title}</p>
                <p className="contents_container_date">{content.date} </p>
              </div>
            </div>
          </a>
        </Link>
      ))}
    </Layout>
  );
};
export default Category;

export const getStaticProps = async ({
  params,
}: {
  params: { category: string[] };
}) => {
  console.log("ppp", params);
  const contents = getPostsByCategory(params.category);
  console.log("C=", contents);
  return {
    props: {
      contents,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts();
  console.log("posts=", posts);
  //カテゴリー名をgetStaticPropsに渡す
  const paths = posts.map((post) => {
    post.pop();
    return {
      params: {
        category: post,
      },
    };
  });
  console.log("paths=", ...paths);
  return { paths: paths, fallback: false };
};
