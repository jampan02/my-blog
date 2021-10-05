import { GetStaticPaths } from "next";
import { getPostContent, getSameCategoryPosts } from "../../lib/api";
import remark from "remark";
import html from "remark-html";
import Layout from "../../components/Layout";
import HEAD from "../../components/head";
import { CONTENT, RelatedPosts } from "../../types/BlogAPIType";
import PostContent from "../../components/PostContent";
import PostThread from "../../components/PostThread";
import { getFilePathsArray } from "../../firebase/nodeFunctions";
type Props = {
  post: CONTENT;
  relatedPosts: RelatedPosts;
};
const Post: React.FC<Props> = ({ post, relatedPosts }) => {
  if (post)
    return (
      <Layout>
        <HEAD
          title={post.title}
          description={post.description}
          keyword={post.keyword}
          image={
            post.image !== "null"
              ? post.image
              : "https://firebasestorage.googleapis.com/v0/b/frontedcode-22c73.appspot.com/o/default%2Fdefault.jpg?alt=media&token=a9a2d40a-63d7-430e-b65d-7d8a2b22ca14"
          }
          url={post.url}
        />
        {post.content && <PostContent post={post} />}
        {/*同じカテゴリの投稿一覧 */}
        <div className="max-w-2xl m-auto">
          <p className="contents_header">{`${post.category}に関する投稿`}</p>
          {relatedPosts.data.map((post, i) => {
            return (
              <PostThread
                key={i}
                post={{
                  ...post,
                  category: relatedPosts.category,
                  categoryPath: relatedPosts.categoryPath,
                }}
              />
            );
          })}
        </div>
      </Layout>
    );
  return null;
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
  const parsedSlug = "posts/" + params.slug.join("/");
  const post = await getPostContent(parsedSlug);
  if (post) {
    const content = await markdownTohtml(post.content);
    params.slug.pop();

    const items = await getSameCategoryPosts(params.slug);

    if (items) {
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
    }
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allpaths = await getFilePathsArray();

  const paths =
    allpaths &&
    allpaths.map((post) => {
      post.shift();
      return {
        params: {
          slug: post,
        },
      };
    });

  return { paths: paths || [], fallback: false };
};
