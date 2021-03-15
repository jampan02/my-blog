import { useState } from "react";
import { useRouter } from "next/router";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export const SearchArea = () => {
  const router = useRouter();
  const [value, setValue] = useState<string>("");
  const onPushResult = () => {
    if (value === "") {
      return;
    }
    router.push({
      pathname: "/posts/result/",
      query: { s: value },
    });
  };
  return (
    <div className="sidebar_container">
      <p className="sidebar_title">ブログ内の記事を検索する</p>
      <input
        data-testId="search-box"
        type="text"
        placeholder="サイト内検索"
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        data-testId="result-submit"
        onClick={() => {
          onPushResult();
        }}
      >
        <div className="h-4 w-4 ml-2">
          <FontAwesomeIcon icon={faSearch} size="xs" />
        </div>
      </button>
    </div>
  );
};
