import { sideMenuItems } from "@/constants/GlobalConstants";
import { BaseLayout } from "@/containers/BaseLayout/BaseLayout";
import { SingleBook } from "@/containers/SingleBook/SingleBook";

export default function SingleBookPage() {
  return (
    <BaseLayout
      authenticatedOnly={true}
      showSearchBar={true}
      pageName={sideMenuItems.BookShelf.name}
    >
      <SingleBook/>
    </BaseLayout>
  );
}
