import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { getPage } from "next-page-tester";
import userEvent from "@testing-library/user-event";

describe("index page", () => {
  it("should render the list of blog", async () => {
    const { page } = await getPage({
      route: "/index",
    });
    render(page);
    expect(await screen.findByText("最近の投稿")).toBeInTheDocument();
    expect(screen.getByText("Next.jsの始め方")).toBeInTheDocument();
  });
  it("should render the result of keyword", async () => {
    const { page } = await getPage({
      route: "/index",
    });
    render(page);
    userEvent.type(screen.getByTestId("search-box"), "R");
    userEvent.click(screen.getByTestId("result-submit"));
    await screen.findByText('"R"を含む投稿一覧');
    expect(
      screen.getByText(
        "【初学者向け】Firebaseを使用した、Reactプロジェクトの超簡単デプロイ"
      )
    ).toBeInTheDocument();
  });
});
