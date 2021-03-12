import React, { ReactNode, useState } from "react";
import Link from "next/link";
import SideBar from "./SideBar";
import { Footer } from "./Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Layout: React.FC<Props> = ({ children }) => {
  const [isShowMenu, setIsShowMenu] = useState<boolean>(false);
  return (
    <div>
      <header className="bg-blue-200 mb-20 py-10 relative">
        <div className="flex justify-center items-center">
          <img className="h-8 w-8" src="/images/earth.png" alt="earth" />
          <span className="text-4xl ml-2 font-bold text-center mb-2 text-gray-700">
            Fronted Code
          </span>
        </div>
        <p className="text-center mb-4 text-gray-600 px-4">
          私の知識や、知ってたらよかったこと等が書いてあるブログです
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
              <Link href="/sitemap">
                <a>サイトマップ</a>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="menu_container">
          <a onClick={() => setIsShowMenu(!isShowMenu)}>
            <FontAwesomeIcon icon={faBars} />
          </a>
        </div>
      </header>
      {/*メインコンテンツとサイドバー */}
      <div className="flex justify-center flex-wrap items-start mx-2">
        {/* menuアイコンが押された場合sidebarをここにアコーディオン表示 */}
        {isShowMenu && (
          <div>
            <SideBar />
          </div>
        )}
        <main className="max-w-4xl">{children}</main>
        <aside className="bg-gray-100 p-5 ml-10 rounded hidden xl:block">
          <SideBar />
        </aside>
      </div>
      <footer className="flex flex-wrap h-32 bg-gray-800 items-center justify-around">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
