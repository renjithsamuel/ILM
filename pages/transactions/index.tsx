import { sideMenuItems } from "@/constants/GlobalConstants";
import { BaseLayout } from "@/containers/BaseLayout/BaseLayout";
import { Transactions } from "@/containers/Transactions/Transactions";

export default function TransactionsPage() {
  return (
    <BaseLayout
      authenticatedOnly={true}
      showSearchBar
      pageName={sideMenuItems.Transactions.name}
    >
      <Transactions />
    </BaseLayout>
  );
}
