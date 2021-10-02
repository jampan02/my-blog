import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React from "react";
import { CONTENT } from "../types/BlogAPIType";
type Props = {
  post: CONTENT;
};
const PostContent: React.FC<Props> = ({ post }) => {
  return (
    <article className="main_contents_container">
      <nav className="link_nav history_nav">
        <ul className="flex">
          <li>
            <Link href="/">
              <a>トップページ</a>
            </Link>
            <span className="arrow-right">{" > "}</span>
          </li>
          {/*ネストするほど、liふえる */}
          {post.category[0] && (
            <li>
              <Link
                href="/posts/category/[category]"
                as={`/posts/category/${post.categoryPath[0]}`}
              >
                <a>{post.category[0]}</a>
              </Link>
              <span className="arrow-right">{` > `}</span>
            </li>
          )}
          {post.category[1] && (
            <li>
              <Link
                href="/posts/category/[categoryContainer]/[category]"
                as={`/posts/category/${post.categoryPath[0]}/${post.categoryPath[1]}`}
              >
                <a>{post.category[1]}</a>
              </Link>
              <span className="arrow-right">{` > `}</span>
            </li>
          )}
          {post.category[2] && (
            <li>
              <Link
                href="/posts/category/[category]"
                as={`/posts/category/${post.categoryPath[2]}`}
              >
                <a>{post.category[2]}</a>
              </Link>
              <span className="arrow-right">{` > `}</span>
            </li>
          )}
          <li>{post.title}</li>
        </ul>
      </nav>
      <p className="mb-4 text-gray-500">{post.date}</p>
      <span className="py-2 px-3 rounded-lg bg-blue-400 mt-8 text-gray-700">
        {post.category[post.category.length - 1]}
      </span>
      <img
        className="my-10"
        src={post.image || "/images/posts/ogp/default.jpg"}
        alt={post.title || "Fronted Code"}
      />
      <div
        className="main_contents"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
      <nav className="main_sns_container">
        <ul>
          <li>
            <a target="__blank" href="https://twitter.com/6qVsERA7OpoHtLH">
              <FontAwesomeIcon icon={faTwitter} size="2x" />
            </a>
          </li>
        </ul>
      </nav>
    </article>
  );
};

export default PostContent;
