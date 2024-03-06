import { sideMenuItems } from "@/constants/GlobalConstants";
import { BaseLayout } from "@/containers/BaseLayout/BaseLayout";
import { PredictiveAnalysis } from "@/containers/PredictiveAnalysis/PredictiveAnalysis";

export default function SingleUserPage() {
  return (
    <BaseLayout
      authenticatedOnly={true}
      showSearchBar
      pageName={sideMenuItems.PredictiveAnalysis.name}
    >
      <PredictiveAnalysis />
    </BaseLayout>
  );
}
