import { sideMenuItems } from "@/constants/GlobalConstants";
import { BaseLayout } from "@/containers/BaseLayout/BaseLayout";
import { MyBooks } from "@/containers/MyBooks/MyBooks";

export default function SingleUserPage() {
  return (
    <BaseLayout
      authenticatedOnly={true}
      showSearchBar
      pageName={sideMenuItems.MyBooks.name}
    >
      <MyBooks/>
    </BaseLayout>
  );
}
