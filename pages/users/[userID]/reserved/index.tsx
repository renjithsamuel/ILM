import { sideMenuItems } from "@/constants/GlobalConstants";
import { BaseLayout } from "@/containers/BaseLayout/BaseLayout";
import { UserBooksList } from "@/containers/UserBookList/UserBooksList";

export default function SingleUserPage() {
  return (
    <BaseLayout
      authenticatedOnly={true}
      showSearchBar
      pageName={sideMenuItems.Transactions.name}
    >
      <UserBooksList />
    </BaseLayout>
  );
}
