import HEAD from "../components/head";
import Layout from "../components/Layout";

const Profile = () => {
  return (
    <Layout>
      <HEAD title="プロフィール" />
      <p className="font-bold text-2xl mb-10">プロフィール</p>
      <div className="mx-auto text-center mb-10">
        <p className="mb-2 font-bold">じゃむぱん</p>
        <img
          className="h-44 w-44 text-center m-auto"
          src="/images/profile/profile.jpg"
          alt="プロフィール"
        />
      </div>

      <p>
        2020年3月にエンジニアになることを決意し勉強を開始し、現在就活中の18歳です。
      </p>
      <p className="mb-20">
        Twitter:
        <a
          className="text-blue-400 border-b hover:border-blue-400"
          target="_blank"
          href="https://twitter.com/6qVsERA7OpoHtLH"
        >
          @6qVsERA7OpoHtLH
        </a>
      </p>
    </Layout>
  );
};

export default Profile;
