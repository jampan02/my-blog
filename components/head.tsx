/*
 * 下記ページの内容をほぼほぼそのまま引用させていただいています。
 * https://t-cr.jp/memo/2201639257480a359
 */
import Head from "next/head";

interface Props {
  title?: string;
  description?: string;
  keyword?: string;
  image?: string;
  url?: string;
}

export default (props: Props): JSX.Element => {
  let { title, description, keyword, image, url } = props;
  if (!title) {
    title = "World Hack";
  } else if (!keyword) {
    keyword =
      "英語　喋る,筋トレ　継続,web,フロントエンドエンジニア　なるには,web系エンジニア　なるには,ライフハック";
  } else if (!description) {
    description =
      "英語、筋トレ、IT等幅広いコンテンツを取り扱っております。読めば得すること間違いなしの記事を沢山書いております。よかったら見ていってください。";
  }
  return (
    <Head>
      <title>{title ? "World Hack" : `${title} | World Hack`}</title>
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta name="keywords" content={keyword} />
      <meta property="og:type" content="blog" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={title} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@tcr_jp" />
      <meta name="twitter:url" content={image} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <link rel="canonical" href={url} />
      <link
        rel="shortcut icon"
        href={
          "https://cdn.qiita.com/assets/favicons/public/production-4ff10c1e1e2b5fcb353ff9cafdd56c70.ico"
        }
      />
      <link
        rel="apple-touch-icon"
        href={
          "https://cdn.qiita.com/assets/favicons/public/apple-touch-icon-f9a6afad761ec2306e10db2736187c8b.png"
        }
      />
    </Head>
  );
};
