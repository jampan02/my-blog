import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

export const Footer = () => {
  return (
    <>
      <div className="">
        <p className="font-bold text-4xl text-gray-300">Fronted Code</p>
      </div>
      <div className="">
        <nav className="mb-4">
          <ul className="footer_nav">
            <li>
              <Link href="/">
                <a>トップ | </a>
              </Link>
            </li>
            <li>
              <Link href="/profile">
                <a>プロフィール | </a>
              </Link>
            </li>
            <li>
              <Link href="/">
                <a>サイトマップ</a>
              </Link>
            </li>
          </ul>
        </nav>
        <nav className="sns_container">
          <ul>
            <li>
              <a target="__blank" href="https://twitter.com/6qVsERA7OpoHtLH">
                <FontAwesomeIcon icon={faTwitter} size="2x" />
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div>
        <p className="text-center text-white text-sm">
          Copyright © 2021 blog name All Rights Reserved.
        </p>
      </div>
    </>
  );
};
