import { Book } from "@/entity/Book/Book";
import { mockBook, mockBooks } from "@/entity/Book/Book.mock";
import { useRouter } from "next/router"
import { useEffect } from "react"

interface SingleBookHookProps{

}

interface SingleBookHook {
    book : Book;
}

export const useSingleBook = ({}: SingleBookHookProps) : SingleBookHook => {
    const router = useRouter()
    const bookID = router.query.ID as string

    // get book
    const book = mockBooks.find((item) => bookID === item.ID) || mockBook

    return {
        book
    }
}