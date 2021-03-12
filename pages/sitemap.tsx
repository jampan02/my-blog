import React from "react";
import HEAD from "../components/head";
import Layout from "../components/Layout";
import { getPosts, POSTS } from "../lib/api";
import Link from "next/link";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const categoryies = [
  {
    top: {
      name: "フロントエンド",
      path: "frontend",
      child: [
        {
          name: "React",
          path: "react",
        },
      ],
    },
  },
  {
    top: {
      name: "バックエンド",
      path: "backend",
      child: [
        {
          name: "Firebase",
          path: "firebase",
        },
      ],
    },
  },
];

const Sitemap = ({ posts }: { posts: POSTS[] }) => {
  return (
    <Layout>
      <HEAD title="サイトマップ" />
      <ul>
        {categoryies.map((category) => (
          <li key={`${category.top.name}atSiteMap`} className="mb-20">
            <p className="text-3xl font-bold mb-4 py-4 bg-gray-300 pl-4">
              {category.top.name}
            </p>
            <ul className="ml-12 relative">
              <span className="absolute h-6 w-6 -left-8 -top-3">
                <FontAwesomeIcon icon={faAngleRight} />
              </span>

              {posts.map((post) => {
                const path = post.categoryPath.join("/");
                if (category.top.path === post.categoryPath[0]) {
                  if (post.categoryPath.length === 1) {
                    return (
                      <li key={`${post.id}of${path}atHome`}>
                        <Link
                          href="/posts/[category]/[id]"
                          as={`/posts/${path}/${post.id}`}
                        >
                          <a className="sitemap_title">{post.title}</a>
                        </Link>
                      </li>
                    );
                  }
                  return null;
                }
                return null;
              })}
              {category.top.child.map((childCategory) => (
                <li key={`${childCategory.name}atSiteMap`}>
                  <p className="font-medium text-2xl border-b-4 border-gray-600 text-gray-800">
                    {childCategory.name}
                  </p>
                  <ul className="ml-12 relative">
                    <span className="absolute h-3 w-3 -left-4">
                      <FontAwesomeIcon icon={faAngleRight} />
                    </span>
                    {posts.map((post) => {
                      const path = post.categoryPath.join("/");
                      if (category.top.path === post.categoryPath[0]) {
                        if (
                          childCategory.path ===
                          post.categoryPath[post.categoryPath.length - 1]
                        ) {
                          return (
                            <li key={`${post.id}of${path}atHome`}>
                              <Link
                                href="/posts/[category]/[id]"
                                as={`/posts/${path}/${post.id}`}
                              >
                                <a className="sitemap_title">{post.title}</a>
                              </Link>
                            </li>
                          );
                        }
                        return null;
                      }
                      return null;
                    })}
                  </ul>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </Layout>
  );
};
export default Sitemap;

export const getStaticProps = async () => {
  const posts = getPosts();
  return { props: { posts } };
};
