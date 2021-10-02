import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import React, { useEffect, useState } from "react";
import { getAllPosts } from "../../lib/api";
import { GetStaticProps } from "next";
import HEAD from "../../components/head";
import { POST } from "../../types/BlogAPIType";
import PostThread from "../../components/PostThread";
type Props = {
  posts: POST[];
};
const Result: React.FC<Props> = ({ posts }) => {
  const [resutls, setResults] = useState<POST[]>([]);
  const router = useRouter();
  const { s = "" } = router.query;
  useEffect(() => {
    const items = posts.filter((post: POST) => {
      const title = post.title;
      const result = title.indexOf(s as string);
      if (!(result === -1)) {
        return post;
      }
    });
    setResults(items);
  }, [router.query]);

  return (
    <Layout>
      <HEAD title={`"${s}"を含む投稿一覧`} noIndex={true} isFollow={false} />
      <p className="contents_header">{`"${s}"を含む投稿一覧`}</p>
      {resutls.map((post: POST, i) => {
        return <PostThread post={post} key={i} />;
      })}
    </Layout>
  );
};
export default Result;

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getAllPosts();

  return {
    props: {
      posts: posts,
    },
  };
};
