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
      "web関連の技術ブログです。フロントエンド中心で、バックエンドちょいちょいのフロントエンドエンジニアになりたい方向けのブログです。Javascript、React、Firebase等を取り扱っております。";
  } else if (image === null) {
    image = "/images/posts/ogp/default.jpg";
  }
  //urlをつなげる
  url = `https://frontedcode.com/posts/${url}`;
  return (
    <Head>
      <title>{title ? `${title} | Fronted Code` : "Fronted Code"}</title>
      {/*固定設定 */}
      <meta
        name="google-site-verification"
        content="WfH9eg4kRFDMlJjKCsc_lfBFNuJ-D8Jcvi4LyyumXY0"
      />
      <script
        data-ad-client="ca-pub-5525090741154027"
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      ></script>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <link rel="icon" href="/path/favicon.ico" />
      <link rel="icon" type="image/x-icon" href="/favicon.ico"></link>
      <link rel="shortcut icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" href="/apple-touch-icon-precomposed" />
      <meta property="og:site_name" content="FrontedCode" />
      {/*ここまで* */}
      {/*こっからmetaタグ */}
      {noIndex &&
        (isFollow ? (
          <meta name="robots" content="noindex,follow"></meta>
        ) : (
          <meta name="robots" content="noindex,nofollow"></meta>
        ))}
      {title && (
        <>
          <meta property="og:title" content={title} />
          <meta name="twitter:title" content={title} />
        </>
      )}
      {image && (
        <>
          <meta property="og:image" content={image} />
          <meta name="twitter:image" content={image} />
        </>
      )}
      {keyword && <meta name="keywords" content={keyword} />}
      <meta property="og:url" content={url} />
      <link rel="canonical" href={url} />
      <meta name="twitter:url" content={url} />
      <meta property="og:description" content={description} />
      <meta name="description" content={description} />
      <meta property="og:type" content="blog" />
      <meta property="og:locale" content="ja_JP" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:site" content="@tcr_jp" />
      <meta name="twitter:description" content={description} />
    </Head>
  );
};

export default HEAD;
