import React from "react";
import HEAD from "../components/head";
import Layout from "../components/Layout";
import { getAllPosts } from "../lib/api";
import Link from "next/link";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { POST } from "../types/BlogAPIType";

const categoryies = [
  {
    top: {
      name: "フロントエンド",
      path: "frontend",
      child: [
        {
          name: "Javascript",
          path: "javascript",
        },
        {
          name: "React",
          path: "react",
        },
        {
          name: "HTML",
          path: "html",
        },
        {
          name: "CSS",
          path: "css",
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
        {
          name: "Laravel",
          path: "laravel",
        },
      ],
    },
  },
  {
    top: {
      name: "インフラ",
      path: "infrastructure",
      child: [
        {
          name: "Docker",
          path: "docker",
        },
        {
          name: "AWS",
          path: "aws",
        },
      ],
    },
  },
  {
    top: {
      name: "その他",
      path: "other",
      child: [
        {
          name: "Workout",
          path: "workout",
        },
      ],
    },
  },
];
type Props = {
  posts: POST[];
};
const Sitemap: React.FC<Props> = ({ posts }) => {
  return (
    <Layout>
      <HEAD title="サイトマップ" />
      <ul>
        {categoryies.map((category) => (
          <li key={`${category.top.name}atSiteMap`} className="mb-28">
            <p className="text-3xl font-bold mb-8 py-4 bg-gray-300 pl-4">
              {category.top.name}
            </p>
            <ul className="ml-12 relative">
              {posts.map((post, i) => {
                const path = post.categoryPath.join("/");
                if (category.top.path === post.categoryPath[0]) {
                  if (post.categoryPath.length === 1) {
                    return (
                      <li key={i}>
                        <Link
                          href={`/posts/[category]/[miniCategory]/[id]`}
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
                <li className="mb-4" key={`${childCategory.name}atSiteMap`}>
                  <p className="font-medium text-2xl border-b-4 border-gray-600 text-gray-800">
                    {childCategory.name}
                  </p>
                  <ul className="ml-12 relative">
                    <span className="absolute h-3 w-3 -left-6">
                      <FontAwesomeIcon icon={faAngleRight} />
                    </span>
                    {posts.map((post, i) => {
                      const path = post.categoryPath.join("/");
                      if (category.top.path === post.categoryPath[0]) {
                        if (
                          childCategory.path ===
                          post.categoryPath[post.categoryPath.length - 1]
                        ) {
                          return (
                            <li key={i}>
                              <Link
                                   href={`/posts/[category]${
									post.categoryPath.length >= 2 && "/[miniCategory]"
								  }/[id]`}
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
  const posts = await getAllPosts();
  return { props: { posts } };
};
