import { UserBookDetailType } from "@/constants/GlobalConstants";
import { Book } from "@/entity/Book/Book";
import { mockBooks } from "@/entity/Book/Book.mock";
import { User } from "@/entity/User/User";
import { mockUser, mockUsers } from "@/entity/User/User.mock";
import { BookDetails } from "@/entity/UserBookDetails/UserBookDetails";
import { mockbookDetailsArray } from "@/entity/UserBookDetails/UserBookDetails.mock";
import { useRouter } from "next/router";
import { SetStateAction, useEffect, useState } from "react";

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
    const user = mockUsers.find((item) => item.userID === userID);
    const bookDetails = mockbookDetailsArray.find(
      (item) => item.userID === userID
    );

    // get books from the user's book details list and give enabled thing -> bookDetailsFrom
    useEffect(() => {
      switch (bookDetailsFrom) {
        case UserBookDetailType.CheckedOut:
          filterBookItems(
            bookDetails,
            setBookList,
            UserBookDetailType.CheckedOut
          );
          break;
        case UserBookDetailType.Pending:
          filterBookItems(bookDetails, setBookList, UserBookDetailType.Pending);
          break;
        case UserBookDetailType.Reserved:
          filterBookItems(
            bookDetails,
            setBookList,
            UserBookDetailType.Reserved
          );
          break;
        case UserBookDetailType.WishLists:
          filterBookItems(
            bookDetails,
            setBookList,
            UserBookDetailType.WishLists
          );
          break;
        case UserBookDetailType.Completed:
          filterBookItems(
            bookDetails,
            setBookList,
            UserBookDetailType.Completed
          );
          break;
        default:
          filterBookItems(
            bookDetails,
            setBookList,
            UserBookDetailType.CheckedOut
          );
      }
    }, [bookDetailsFrom]);

    return {
      bookList,
      bookDetailsFrom,
    };
  };

function filterBookItems(
  bookDetails: BookDetails | undefined,
  setBookList: (value: SetStateAction<Book[]>) => void,
  type: UserBookDetailType
) {
  const thisBookDetails = getBookDetails(bookDetails, type);
  const BookItems = thisBookDetails.map((bookDetailsItem) => {
    return mockBooks.find(
      (mockBookItem) => mockBookItem.ID === bookDetailsItem && mockBookItem
    );
  });
  if (BookItems) {
    // Filter out undefined values using a traditional for loop
    const filteredBooks: Book[] = [];
    for (let i = 0; i < BookItems.length; i++) {
      const book = BookItems[i];
      if (book !== undefined) {
        filteredBooks.push(book);
      }
    }
    setBookList(filteredBooks);
  }
}

function getBookDetails(
  bookDetails: BookDetails | undefined,
  type: UserBookDetailType
): string[] {
  let currBookDetails: string[] | undefined;
  switch (type) {
    case UserBookDetailType.Reserved:
      currBookDetails = bookDetails?.reservedBookList;
      break;

    case UserBookDetailType.Pending:
      currBookDetails = bookDetails?.pendingBooksList;
      break;

    case UserBookDetailType.CheckedOut:
      currBookDetails = bookDetails?.checkedOutBookList;
      break;

    case UserBookDetailType.WishLists:
      currBookDetails = bookDetails?.wishlistBooks;
      break;

    case UserBookDetailType.Completed:
      currBookDetails = bookDetails?.completedBooksList;
      break;
    default:
      currBookDetails = bookDetails?.completedBooksList;
      break;
  }

  return currBookDetails || ([] as string[]);
}
