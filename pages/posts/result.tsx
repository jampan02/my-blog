import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import { useEffect, useState } from "react";
import { getPosts, POSTS } from "../../lib/api";
import Link from "next/link";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import HEAD from "../../components/head";

const Result = ({ posts }: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [resutls, setResults] = useState<POSTS[]>([]);
  const router = useRouter();
  const { s } = router.query;
  useEffect(() => {
    const items = posts.filter((post: POSTS) => {
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
      {resutls.map((post: POSTS) => {
        const path = post.categoryPath.join("/");
        return (
          <Link
            href="/posts/[category]/[id]"
            as={`/posts/${path}/${post.id}`}
            key={`${post.id}of${path}atResult`}
          >
            <a>
              <div className="contents_container">
                <img src={post.image || "/images/posts/ogp/default.jpg"} />
                <div>
                  <p className="contents_container_title">{post.title}</p>
                  <p className="contents_container_category">
                    {post.category[post.category.length - 1]}
                  </p>
                  <p className="contents_container_date">{post.date} </p>
                </div>
              </div>
            </a>
          </Link>
        );
      })}
    </Layout>
  );
};
export default Result;

export const getStaticProps: GetStaticProps = async () => {
  const posts = getPosts();
  return {
    props: {
      posts,
    },
  };
};
