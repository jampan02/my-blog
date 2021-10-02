import { GetStaticPaths } from "next";
import {
  getPostsInsideBigCategory,
  getSameCategoryPosts,
} from "../../../lib/api";
import Layout from "../../../components/Layout";
import PostThread from "../../../components/PostThread";
import HEAD from "../../../components/head";
import { CategoryProps } from "../../../types/BlogAPIType";
import { getCategoryPaths } from "../../../firebase/nodeFunctions";
type Props = {
  posts: CategoryProps;
};
const Category: React.FC<Props> = ({ posts }) => {
  return (
    <Layout>
      <HEAD
        title={`${posts.category[posts.category.length - 1]}に関する投稿一覧`}
      />
      <p className="posts_header">{`${
        posts.category[posts.category.length - 1]
      }に関する投稿一覧`}</p>
      {posts.data.map((post, i) => (
        <PostThread
          post={{
            ...post,
            category: posts.category,
            categoryPath: post.categoryPath
              ? post.categoryPath
              : posts.categoryPath,
          }}
          key={i}
        />
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
  const category = params.category;
  let posts;
  if (category.length === 1) {
    // [frontednd]みたいなとき
    posts = await getPostsInsideBigCategory(params.category);
  } else {
    // [frontend,javascript]みたいなとき（２個以上）
    posts = await getSameCategoryPosts(params.category);
  }

  if (posts) {
    return {
      props: {
        posts,
      },
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allpaths = await getCategoryPaths();

  //カテゴリー名をgetStaticPropsに渡す
  const paths =
    allpaths &&
    allpaths.map((post) => {
      return {
        params: {
          category: post,
        },
      };
    });

  return { paths: paths || [], fallback: false };
};
