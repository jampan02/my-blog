import { useRouter } from "next/router";
import React from "react";

const JSLibrariesTrendArea = () => {
  const router = useRouter();
  return (
    <div>
      <button
        onClick={() => router.push("/jslibrariestrend")}
        className="mb-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
      >
        JSライブラリトレンド
      </button>
    </div>
  );
};

export default JSLibrariesTrendArea;
