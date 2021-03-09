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
  return (
    <Layout>
      <HEAD
        title={`${contents.category}に関する投稿一覧`}
        noIndex={true}
        isFollow={true}
      />
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
  const contents = getPostsByCategory(params.category);

  return {
    props: {
      contents,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts();

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
