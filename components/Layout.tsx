import React, { ReactNode } from "react";
import Link from "next/link";
import SideBar from "./SideBar";
import { Footer } from "./Footer";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout: React.FC<Props> = ({ children }) => (
  <div>
    <header className="bg-blue-200 mb-20 py-10">
      <div className="flex justify-center items-center">
        <img className="h-8 w-8" src="/images/earth.png" />
        <span className="text-4xl ml-2 font-bold text-center mb-2 text-gray-700">
          World Hack
        </span>
      </div>
      <p className="text-center mb-4 text-gray-600">
        幅広い情報をざっくりとまとめます
      </p>
      <nav>
        <ul className="flex justify-around">
          <li>
            <Link href="/">
              <a>トップ</a>
            </Link>
          </li>
          <li>
            <Link href="/profile">
              <a>プロフィール</a>
            </Link>
          </li>
          <li>
            <Link href="/">
              <a>サイトマップ</a>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
    {/*メインコンテンツとサイドバー */}
    <div className="flex justify-center flex-wrap items-start mx-5">
      <main className="max-w-4xl">{children}</main>
      <aside className="bg-gray-100 p-5 ml-10 rounded">
        <SideBar />
      </aside>
    </div>
    <footer className="flex flex-wrap h-32 bg-gray-800 items-center justify-around">
      <Footer />
    </footer>
  </div>
);

export default Layout;
