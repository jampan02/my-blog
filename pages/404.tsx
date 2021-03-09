import Layout from "../components/Layout";
import HEAD from "../components/head";

export default function Custom404() {
  return (
    <Layout>
      <HEAD title="404" noIndex={true} isFollow={false} />
      <h1>404</h1>
    </Layout>
  );
}
