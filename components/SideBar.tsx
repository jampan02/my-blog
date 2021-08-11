import { ArchiveArea } from "./ArchiveArea";
import { CategoryiesArea } from "./CategoryiesArea";
import JSLibrariesTrendArea from "./JSLibrariesTrendArea";
import { SearchArea } from "./SearchArea";
import { SnsArea } from "./SnsArea";

const SideBar = () => {
  return (
    <>
      <JSLibrariesTrendArea />
      <SearchArea />
      <SnsArea />
      <CategoryiesArea />
      <ArchiveArea />
    </>
  );
};

export default SideBar;
