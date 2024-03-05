import { sideMenuItems } from "@/constants/GlobalConstants";
import { BaseLayout } from "@/containers/BaseLayout/BaseLayout";
import { Dashboard } from "@/containers/Dashboard/Dashboard";

export default function DashboardPage() {
  return (
    <BaseLayout
      authenticatedOnly={true}
      showSearchBar
      pageName={sideMenuItems.Dashboard.name}
    >
      <Dashboard />
    </BaseLayout>
  );
}