import { useGetAllBooksFromBookDetailsAPI } from "@/goconnection/Book/getAllBooksFromBookDetails";
import { useGetUserByIDAPI } from "@/goconnection/User/getUserByUserID";
import { UserBookDetailType } from "@/constants/GlobalConstants";
import { Role } from "@/constants/Role";
import { usePageContext } from "@/context/PageContext";
import { useUserContext } from "@/context/UserContext";
import { Book } from "@/entity/Book/Book";
import { mockBooks } from "@/entity/Book/Book.mock";
import { BookDetails } from "@/entity/UserBookDetails/UserBookDetails";
import { mockbookDetailsArray } from "@/entity/UserBookDetails/UserBookDetails.mock";
import { useRouter } from "next/router";
import { SetStateAction, useEffect, useMemo, useState } from "react";

interface userbookslistHookProps {}

interface userbookslistHook {
  bookList: Book[] | undefined;
  bookDetailsFrom: string;
}

export const useUserBooksList =
  ({}: userbookslistHookProps): userbookslistHook => {
    const { setSnackBarError } = usePageContext();
    const [requiredUserID, setRequiredUserID] = useState<string>("");
    const [bookDetailsFrom, setBookDetailsFrom] = useState<UserBookDetailType>(
      UserBookDetailType.WishLists
    );
    const router = useRouter();

    const userID = router.query.userID as string;
    const { user: contextUser } = useUserContext();

    const { data: bookListData, isError: isBookListError } =
      useGetAllBooksFromBookDetailsAPI(
        {
          bookDetailsFrom: bookDetailsFrom,
          userID: requiredUserID,
        },
        requiredUserID != "" && !!bookDetailsFrom
      );

    // get books from the user's book details list and give enabled thing -> bookDetailsFrom
    // send bookDetailsFrom and userID to backend
    useMemo(() => {
      const tempBookDetailsFrom = router?.pathname?.split("/")[3];
      if (tempBookDetailsFrom) {
        setBookDetailsFrom(tempBookDetailsFrom as UserBookDetailType);
      }
    }, [router?.pathname]);

    useEffect(() => {
      if (isBookListError) {
        setSnackBarError({
          ErrorMessage: "get book list failed",
          ErrorSeverity: "error",
        });
        return;
      }
    }, [isBookListError]);

    useEffect(() => {
      if (contextUser.role && contextUser.role === Role.Patrons && !userID) {
        // if it's from the user's side wishlist, return userID matching from context
        contextUser?.userID && setRequiredUserID(contextUser?.userID);
      }
    }, [contextUser?.userID, contextUser.role, userID]);

    useEffect(() => {
      if (userID) {
        // if it's from the librarian's side wishlist, return userID matching from query
        setRequiredUserID(userID);
      }
    }, [userID]);

    return {
      bookList: bookListData?.data,
      bookDetailsFrom,
    };
  };
