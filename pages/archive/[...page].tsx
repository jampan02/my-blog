import { GetStaticPaths } from "next";
import React from "react";
import HEAD from "../../components/head";
import Layout from "../../components/Layout";
import PostThread from "../../components/PostThread";
import { getDatesPath, getPostsByDate } from "../../lib/api";
import { POST } from "../../types/BlogAPIType";

type Props = {
  posts: POST[];
  date: string[];
};

const Archive: React.FC<Props> = ({ posts, date }) => {
  // パスパラメータから値を取得
  return (
    <Layout>
      <HEAD title={`${date[0]}年${date[1]}月の投稿一覧`} />
      <p className="contents_header">{`${date[0]}年${date[1]}月の投稿一覧`}</p>
      {posts.map((post, i) => {
        return <PostThread post={post} key={i} />;
      })}
    </Layout>
  );
};

export const getStaticProps = async ({
  params,
}: {
  params: { page: string[] };
}) => {
  const data = await getPostsByDate(params.page);
  const items = data?.items;
  const date = data?.date;
  return {
    props: {
      posts: items,
      date,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  let posts = await getDatesPath();

  const paths =
    posts &&
    posts.map((post) => {
      return {
        params: {
          page: post,
        },
      };
    });

  return { paths: paths || [], fallback: false };
};
export default Archive;
