import { GetStaticPaths } from "next";
import { getAllPosts, getPostBySlug, getPostsByCategory } from "../../lib/api";
import remark from "remark";
import html from "remark-html";
import Layout from "../../components/Layout";
import Link from "next/link";
import HEAD from "../../components/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

type Posts = {
  title: any;
  description: any;
  keyword: any;
  image: any;
  url: any;
  category: string[];
  content: string;
  date: string[];
  categoryPath: string[];
};

type RelatedPosts = {
  slicedItems: {
    title: string;
    date: string;
    id: string;
  }[];
  data: {
    title: string;
    date: string;
    id: string;
    image: string;
  }[];
  category: string[];
  categoryPath: string[];
};

const Post = ({
  post,
  relatedPosts,
}: {
  post: Posts;
  relatedPosts: RelatedPosts;
}) => {
  return (
    <Layout>
      <HEAD
        title={post.title}
        description={post.description}
        keyword={post.keyword}
        image={post.image}
        url={post.url}
      />
      {post.content && (
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
            src={post.image}
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
      )}
      {/*同じカテゴリの投稿一覧 */}
      <div className="max-w-2xl m-auto">
        <p className="contents_header">{`${post.category}に関する投稿`}</p>
        {relatedPosts.data.map((post) => (
          <Link
            href="/posts/[category]/[id]"
            as={`/posts/${relatedPosts.categoryPath}/${post.id}/`}
            key={`${post.id}of${post.title}atRelatedPosts`}
          >
            <a>
              <div className="contents_container">
                <img src={post.image} />
                <div>
                  <p className="contents_container_title">{post.title}</p>
                  <p className="contents_container_date">{post.date} </p>
                </div>
              </div>
            </a>
          </Link>
        ))}
      </div>
    </Layout>
  );
};
export default Post;

const markdownTohtml = async (markdown: string) => {
  const result = await remark().use(html).process(markdown);
  return result.toString();
};

export const getStaticProps = async ({
  params,
}: {
  params: { slug: string[] };
}) => {
  //メイン投稿取得
  const post = getPostBySlug(params.slug);
  const content = await markdownTohtml(post.content);

  const items = getPostsByCategory(params.slug);
  const slicedItems = items.data.slice(0, 5);
  const relatedPosts = {
    ...items,
    slicedItems,
  };
  return {
    props: {
      post: {
        ...post,
        content,
      },
      relatedPosts,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts();
  console.log(...posts);
  const paths = posts.map((post) => {
    return {
      params: {
        slug: post,
      },
    };
  });

  return { paths: paths, fallback: false };
};
