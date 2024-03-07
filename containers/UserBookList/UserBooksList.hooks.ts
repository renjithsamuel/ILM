import { UserBookDetailType } from "@/constants/GlobalConstants";
import { Role } from "@/constants/Role";
import { useUserContext } from "@/context/UserContext";
import { Book } from "@/entity/Book/Book";
import { mockBooks } from "@/entity/Book/Book.mock";
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
    const [bookDetailsFrom, setBookDetailsFrom] = useState<UserBookDetailType>(
      UserBookDetailType.WishLists,
    );
    const router = useRouter();
    const { user: contextUser } = useUserContext();
    const userID = router.query.userID as string;
    // get book details from userID
    const bookDetails = mockbookDetailsArray.find((item) => {
      // if its from user side wishlist return userID matching from context
      if (
        contextUser.role === Role.Patrons &&
        !userID &&
        contextUser.userID === item.userID
      )
        return item;
      // if its from librarian side wishlist return userID matching from query
      if (userID && item.userID === userID) return item;
    });

    useEffect(() => {
      const tempBookDetailsFrom = router?.pathname?.split("/")[3];
      if (tempBookDetailsFrom) {
        setBookDetailsFrom(tempBookDetailsFrom as UserBookDetailType);
      }
    }, [router?.pathname]);

    // get books from the user's book details list and give enabled thing -> bookDetailsFrom
    useEffect(() => {
      switch (bookDetailsFrom) {
        case UserBookDetailType.CheckedOut:
          filterBookItems(
            bookDetails,
            setBookList,
            UserBookDetailType.CheckedOut,
          );
          break;
        case UserBookDetailType.Pending:
          filterBookItems(bookDetails, setBookList, UserBookDetailType.Pending);
          break;
        case UserBookDetailType.Reserved:
          filterBookItems(
            bookDetails,
            setBookList,
            UserBookDetailType.Reserved,
          );
          break;
        case UserBookDetailType.WishLists:
          filterBookItems(
            bookDetails,
            setBookList,
            UserBookDetailType.WishLists,
          );
          break;
        case UserBookDetailType.Completed:
          filterBookItems(
            bookDetails,
            setBookList,
            UserBookDetailType.Completed,
          );
          break;
        default:
          filterBookItems(
            bookDetails,
            setBookList,
            UserBookDetailType.WishLists,
          );
      }
    }, [bookDetails, bookDetailsFrom]);

    console.log("userID", userID);
    console.log("bookDetailsFrom", bookDetailsFrom);

    return {
      bookList,
      bookDetailsFrom,
    };
  };

function filterBookItems(
  bookDetails: BookDetails | undefined,
  setBookList: (value: SetStateAction<Book[]>) => void,
  type: UserBookDetailType,
) {
  const bookStringList = getBookDetails(bookDetails, type);
  const BookItems = bookStringList.map((bookDetailsItem) => {
    return mockBooks.find((mockBookItem) => {
      if (mockBookItem.ID === bookDetailsItem) {
        return mockBookItem;
      }
    });
  });
  console.log("BookItems", BookItems);
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
  type: UserBookDetailType,
): string[] {
  let currBooksStringList: string[] | undefined;
  switch (type) {
    case UserBookDetailType.Reserved:
      currBooksStringList = bookDetails?.reservedBookList;
      break;

    case UserBookDetailType.Pending:
      currBooksStringList = bookDetails?.pendingBooksList;
      break;

    case UserBookDetailType.CheckedOut:
      currBooksStringList = bookDetails?.checkedOutBookList;
      break;

    case UserBookDetailType.WishLists:
      currBooksStringList = bookDetails?.wishlistBooks;
      break;

    case UserBookDetailType.Completed:
      currBooksStringList = bookDetails?.completedBooksList;
      break;

    default:
      currBooksStringList = bookDetails?.wishlistBooks;
      break;
  }

  return currBooksStringList || ([] as string[]);
}
