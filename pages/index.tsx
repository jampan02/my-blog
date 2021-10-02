import Layout from "../components/Layout";
import { GetStaticProps } from "next";
import { getAllPosts } from "../lib/api";
import HEAD from "../components/head";
import { POST } from "../types/BlogAPIType";
import PostThread from "../components/PostThread";
type Props = {
  posts: POST[];
};
const IndexPage: React.FC<Props> = ({ posts }) => {
  return (
    <Layout>
      <HEAD />
      <p className="contents_header">最近の投稿一覧</p>
      {posts.map((post: POST, i) => {
        return <PostThread post={post} key={i} />;
      })}
    </Layout>
  );
};

export default IndexPage;

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllPosts();

  return {
    props: {
      posts,
    },
  };
};
