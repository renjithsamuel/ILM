import { sideMenuItems } from "@/constants/GlobalConstants";
import { BaseLayout } from "@/containers/BaseLayout/BaseLayout";
import { SingleUser } from "@/containers/SingleUser/SingleUser";

export default function SingleUserPage() {
  return (
    <BaseLayout
      authenticatedOnly={true}
      showSearchBar
      pageName={sideMenuItems.Transactions.name}
    >
      <SingleUser/>
    </BaseLayout>
  );
}
