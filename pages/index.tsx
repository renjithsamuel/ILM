import { BaseLayout } from "@/containers/BaseLayout/BaseLayout";

export default function Home() {
  return (
    <BaseLayout
      authenticatedOnly={false}
      showSearchBar
      pageName={"Home"}
    ></BaseLayout>
  );
}
