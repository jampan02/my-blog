import Link from "next/link";

const categories = [
  { category: "政治", path: "government" },
  { category: "テクノロジー", path: "technology" },
];

export const CategoryiesArea = () => {
  return (
    <div className="sidebar_container category_container">
      <p className="sidebar_title">カテゴリー一覧</p>

      <nav className="link_nav">
        <ul>
          {categories.map((category) => (
            <li key={`${category.category}of${category.path}atCategoryiesArea`}>
              <Link href="/posts/[category]" as={`/posts/${category.path}`}>
                <a>{category.category}</a>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
