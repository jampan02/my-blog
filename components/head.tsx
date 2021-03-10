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
  isFollow?: boolean;
  noIndex?: boolean;
}

const HEAD = (props: Props): JSX.Element => {
  let { title, description, keyword, image, url, isFollow, noIndex } = props;
  if (!description) {
    description =
      "英語、筋トレ、IT等幅広いコンテンツを取り扱っております。読めば得すること間違いなしの記事を沢山書いております。よかったら見ていってください。";
  }
  //urlをつなげる
  url = `https://frontedcode.com/${url}`;
  return (
    <Head>
      <title>{title ? `${title} | Fronted Code` : "Fronted Code"}</title>
      {/*固定設定 */}
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <link rel="icon" href="/path/favicon.ico" />
      <link rel="icon" type="image/x-icon" href="/favicon.ico"></link>
      <link rel="shortcut icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon-precomposed" />
      {/*ここまで* */}
      {/*こっからmetaタグ */}
      {noIndex &&
        (isFollow ? (
          <meta name="robots" content="noindex,follow"></meta>
        ) : (
          <meta name="robots" content="noindex,nofollow"></meta>
        ))}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta name="keywords" content={keyword} />
      <meta name="description" content={description} />
      <meta property="og:type" content="blog" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={title} />
      <meta property="og:locale" content="ja_JP" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@tcr_jp" />
      <meta name="twitter:url" content={image} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <link rel="canonical" href={url} />
    </Head>
  );
};

export default HEAD;
