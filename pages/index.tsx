import { sideMenuItems } from "@/constants/GlobalConstants";
import { AllBooks } from "@/containers/AllBooks/AllBooks";
import { BaseLayout } from "@/containers/BaseLayout/BaseLayout";

export default function Home() {
  return (
    <BaseLayout
      authenticatedOnly={false}
      showSearchBar
      pageName={sideMenuItems.AllBooks.name}
    >
      <AllBooks />
    </BaseLayout>
  );
}
