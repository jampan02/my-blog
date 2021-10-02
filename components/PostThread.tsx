import Link from "next/link";
import React from "react";

import { POST } from "../types/BlogAPIType";
type Props = {
  post: POST;
};
const PostThread: React.FC<Props> = ({ post }) => {
  const path = post.categoryPath.join("/");

  return (
    <div>
      <Link
        href={`/posts/[category]${
          post.categoryPath.length >= 2 && "/[miniCategory]"
        }/[id]`}
        as={`/posts/${path}/${post.id}`}
      >
        <a>
          <div className="contents_container">
            <img
              src={post.image || "/images/posts/ogp/default.jpg"}
              alt={post.title}
            />
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
};

export default PostThread;
