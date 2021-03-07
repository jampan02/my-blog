import { GetStaticPaths } from "next";
import Link from "next/link";
import React from "react";
import Head from "../../components/head";
import Layout from "../../components/Layout";
import { getDatesPath, getPostsByDate, POSTS } from "../../lib/api";

export default function Archive({
  posts,
  date,
}: {
  posts: POSTS[];
  date: string[];
}) {
  // パスパラメータから値を取得
  return (
    <Layout>
      <Head
        title={`${date[0]}年${date[1]}月の投稿一覧`}
        description={undefined}
        keyword={undefined}
        image={undefined}
        url={undefined}
      />
      <p className="contents_header">{`${date[0]}年${date[1]}月の投稿一覧`}</p>
      {posts.map((post: POSTS) => (
        <div key={`${post.id}of${post.categoryPath}atResult`}>
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
}

export const getStaticProps = async ({
  params,
}: {
  params: { page: string[] };
}) => {
  const { items, date } = getPostsByDate(params.page);
  return {
    props: {
      posts: items,
      date,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  let posts = getDatesPath();
  console.log("posts hufa=", posts);
  const paths = posts.map((post) => {
    return {
      params: {
        page: post,
      },
    };
  });
  console.log("paths=", paths);
  return { paths: paths, fallback: false };
};
