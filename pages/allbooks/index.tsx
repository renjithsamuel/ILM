import { sideMenuItems } from "@/constants/GlobalConstants";
import { AllBooks } from "@/containers/AllBooks/AllBooks";
import { BaseLayout } from "@/containers/BaseLayout/BaseLayout";
import { UserBooksList } from "@/containers/UserBookList/UserBooksList";

export default function SingleUserPage() {
  return (
    <BaseLayout
      authenticatedOnly={true}
      showSearchBar
      pageName={sideMenuItems.AllBooks.name}
    >
      <AllBooks />
    </BaseLayout>
  );
}
