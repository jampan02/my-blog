import Link from "next/link";
import Layout from "../components/Layout";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { getPosts } from "../lib/api";
import HEAD from "../components/head";

type POSTS = {
  title: string;
  image: string;
  category: string[];
  date: string;
  id: string;
  categoryPath: string[];
};

const IndexPage = ({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout>
      <HEAD />
      <p className="contents_header">最近の投稿一覧</p>
      {posts.map((post: POSTS) => {
        const path = post.categoryPath.join("/");

        return (
          <div key={`${post.id}of${path}atHome`}>
            <Link
              href="/posts/[category]/[id]"
              as={`/posts/${path}/${post.id}`}
            >
              <a data-testId={post.title}>
                <div className="contents_container">
                  <img src={post.image} />
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
          </div>
        );
      })}
    </Layout>
  );
};

export default IndexPage;

export const getStaticProps: GetStaticProps = async () => {
  const posts = getPosts();
  return {
    props: {
      posts,
    },
  };
};
