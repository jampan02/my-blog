import Link from "next/link";

const categories = [
  {
    name: "フロントエンド",
    path: "frontend",
    children: [
      {
        name: "Javascript",
        path: "javascript",
      },
      {
        name: "React",
        path: "react",
      },
      {
        name: "HTML",
        path: "html",
      },
      {
        name: "CSS",
        path: "css",
      },
    ],
  },
  {
    name: "バックエンド",
    path: "backend",
    children: [
      {
        name: "Firebase",
        path: "firebase",
      },
      {
        name: "Laravel",
        path: "laravel",
      },
    ],
  },
  {
    name: "インフラ",
    path: "infrastructure",
    children: [
      {
        name: "Docker",
        path: "docker",
      },
    ],
  },
];

export const CategoryiesArea = () => {
  return (
    <div className="sidebar_container category_container">
      <p className="sidebar_title">カテゴリー一覧</p>

      <nav className="link_nav">
        <ul>
          {categories.map((item) => (
            <li
              className="font-bold text-lg"
              key={`${item.name}of${item.path}atCategoryiesArea`}
            >
              <Link
                href="/posts/category/[category]"
                as={`/posts/category/${item.path}`}
              >
                <a>{item.name}</a>
              </Link>
              <ul className="ml-4 text-base font-normal">
                {item.children.map((childItem) => (
                  <li
                    key={`${childItem.name}of${childItem.path}atCategoryiesArea`}
                  >
                    <Link
                      href="/posts/category/[parentCategory]/[path]"
                      as={`/posts/category/${item.path}/${childItem.path}`}
                    >
                      <a>{childItem.name}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
