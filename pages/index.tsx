import Link from "next/link";
import Layout from "../components/Layout";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { getPosts } from "../lib/api";
import Head from "../components/head";

type POSTS = {
  title: string;
  image: string;
  category: string;
  date: string;
  id: string;
  categoryPath: string;
};

const IndexPage = ({
  posts,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout>
      <Head
        title={undefined}
        description={undefined}
        keyword={undefined}
        image={undefined}
        url={undefined}
      />
      <p className="contents_header">最近の投稿</p>
      {posts.map((post: POSTS) => (
        <div key={`${post.id}of${post.categoryPath}atHome`}>
          <Link
            href="/posts/[category]/[id]"
            as={`/posts/${post.categoryPath}/${post.id}`}
          >
            <a>
              <div className="contents_container">
                <img src={post.image} />
                <div>
                  <p className="contents_container_title">{post.title}</p>
                  <p className="contents_container_category">{post.category}</p>
                  <p className="contents_container_date">{post.date} </p>
                </div>
              </div>
            </a>
          </Link>
        </div>
      ))}
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
