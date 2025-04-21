import { sideMenuItems } from "@/constants/GlobalConstants";
import { BaseLayout } from "@/containers/BaseLayout/BaseLayout";
import { Settings } from "@/containers/Settings/Settings";

export default function SettingsPage() {
  return (
    <BaseLayout
      authenticatedOnly={true}
      showSearchBar
      pageName={sideMenuItems.Settings.name}
    >
      <Settings />
    </BaseLayout>
  );
}
