import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from "next";
import { getAllPosts, getPostsByCategory } from "../../lib/api";
import Layout from "../../components/Layout";
import Link from "next/link";
import Head from "../../components/head";

const Category = ({
  contents,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <Layout>
      <Head
        title={`${contents.category}に関する投稿一覧`}
        description={undefined}
        keyword={undefined}
        image={undefined}
        url={undefined}
      />
      <p className="contents_header">{`${contents.category}に関する投稿一覧`}</p>
      {contents.data.map((content: any) => (
        <Link
          href="/posts/[category]/[id]"
          as={`/posts/${contents.categoryPath}/${content.id}`}
          key={`${contents.categoryPath}/${content.id}`}
        >
          <a>
            <div className="contents_container">
              <img src={content.image} />
              <div>
                <p className="contents_container_title">{content.title}</p>
                <p className="contents_container_date">{content.date} </p>
              </div>
            </div>
          </a>
        </Link>
      ))}
    </Layout>
  );
};
export default Category;

export const getStaticProps: GetStaticProps = async ({ params }: any) => {
  const contents = getPostsByCategory(params.category);
  return {
    props: {
      contents,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPosts();
  console.log("posts=", posts);
  //カテゴリー名をgetStaticPropsに渡す
  const paths = posts.map((post) => {
    return {
      params: {
        category: post[0],
      },
    };
  });
  console.log("paths=", paths);
  return { paths: paths, fallback: false };
};
