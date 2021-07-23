import { GetStaticPaths } from "next";
import {
  CategoryProps,
  getAllPosts,
  getPostsByCategory,
} from "../../../lib/api";
import Layout from "../../../components/Layout";
import Link from "next/link";
import HEAD from "../../../components/head";

const Category = ({ contents }: { contents: CategoryProps }) => {
  let path = contents.categoryPath.join("/");

  return (
    <Layout>
      <HEAD
        title={`${
          contents.category[contents.category.length - 1]
        }に関する投稿一覧`}
      />
      <p className="contents_header">{`${
        contents.category[contents.category.length - 1]
      }に関する投稿一覧`}</p>
      {contents.data.map((content: any) => (
        <Link
          href="/posts/[category]/[miniCatebory]/[id]"
          as={`/posts/${path}/${content.id}`}
          key={`${path}/${content.id}atCategory`}
        >
          <a>
            <div className="contents_container">
              <img
                src={content.image || "/images/posts/ogp/default.jpg"}
                alt={content.title}
              />
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
  console.log(params);
  const contents = getPostsByCategory(params.category);
  console.log("contents=", contents);
  return {
    props: {
      contents,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts();
  console.log(posts);
  //カテゴリー名をgetStaticPropsに渡す
  const paths = posts.map((post) => {
    post.pop();
    return {
      params: {
        category: post,
      },
    };
  });

  return { paths: paths, fallback: false };
};
