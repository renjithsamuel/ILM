import { UserBookDetailType } from "@/constants/GlobalConstants";
import { Book } from "@/entity/Book/Book";
import { mockBooks } from "@/entity/Book/Book.mock";
import { User } from "@/entity/User/User";
import { mockUsers } from "@/entity/User/User.mock";
import { BookDetails } from "@/entity/UserBookDetails/UserBookDetails";
import { mockbookDetailsArray } from "@/entity/UserBookDetails/UserBookDetails.mock";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface userbookslistHookProps {}

interface userbookslistHook {
  bookList: Book[];
  bookDetailsFrom: string;
}

export const useUserBooksList =
  ({}: userbookslistHookProps): userbookslistHook => {
    const [bookList, setBookList] = useState<Book[]>([]);

    const router = useRouter();
    const bookDetailsFrom = router?.pathname?.split("/")[3];
    const userID = router?.pathname?.split("/")[2];
    // get book details from userID

    // get books from the user's book details list and give enabled thing -> bookDetailsFrom
    useEffect(() => {
      switch (bookDetailsFrom) {
        case UserBookDetailType.CheckedOut:
          setBookList(mockBooks);
        case UserBookDetailType.Pending:
          setBookList(mockBooks);
        case UserBookDetailType.Reserved:
          setBookList(mockBooks);
        case UserBookDetailType.WishLists:
          setBookList(mockBooks);
        default:
          setBookList(mockBooks);
      }
    }, [bookDetailsFrom]);

    return {
      bookList,
      bookDetailsFrom,
    };
  };
