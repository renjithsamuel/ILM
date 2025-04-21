import { sideMenuItems } from "@/constants/GlobalConstants";
import { BaseLayout } from "@/containers/BaseLayout/BaseLayout";
import { BookShelf } from "@/containers/BookShelf/BookShelf";
import { mockBooks } from "@/entity/Book/Book.mock";

export default function BookShelfPage() {
  return (
    <BaseLayout
      authenticatedOnly={true}
      showSearchBar={true}
      pageName={sideMenuItems.BookShelf.name}
    >
      <BookShelf books={[...mockBooks, ...mockBooks]} />
    </BaseLayout>
  );
}
