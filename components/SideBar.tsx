import { ArchiveArea } from "./ArchiveArea";
import { CategoryiesArea } from "./CategoryiesArea";
import { SearchArea } from "./SearchArea";
import { SnsArea } from "./SnsArea";

const SideBar = () => {
  return (
    <>
      <SearchArea />
      <SnsArea />
      <CategoryiesArea />
      <ArchiveArea />
    </>
  );
};

export default SideBar;
