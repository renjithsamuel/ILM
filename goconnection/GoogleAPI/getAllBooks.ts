import { UseQueryResult, useQuery } from "react-query";
import { AxiosError, AxiosResponse } from "axios";
import { IBook, Book } from "@/entity/Book/Book";
import { GoogleBooksAxios, PrivateAxios } from "..";
import { QueryKeys } from "@/constants/Querykeys";
import { GoogleOrderByValues } from "@/constants/GoogleAPI";
import { IGoogleBook } from "@/entity/GoogleBook/googleBook";

const GoogleApiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

export type GoogleGetAllBooksRequest = {
  startIndex: number;
  maxResults: number;
  orderBy: GoogleOrderByValues;
};

export type GoogleGetAllBooksResponse = AxiosResponse<{
  totalItems: number;
  books: Book[];
}>;
export type GoogleGetAllBooksAPIResponse = {
  totalItems: number;
  items: { volumeInfo: IGoogleBook }[];
};

export const getGoogleAllBooksAPI = async ({
  startIndex,
  maxResults,
  orderBy,
}: GoogleGetAllBooksRequest): Promise<GoogleGetAllBooksResponse> => {
  const response = await GoogleBooksAxios.get<GoogleGetAllBooksAPIResponse>(
    `v1/volumes?q=orderBy=${orderBy}&startIndex=${startIndex}&maxResults=${maxResults}&key=${GoogleApiKey}`,
  );

  let books: Book[] = response.data.items.map(
    (item) =>
      new Book({
        title: item.volumeInfo.title,
        author: item.volumeInfo.authors[0] as string,
        booksLeft: 0,
        coverImage: item.volumeInfo.imageLinks.thumbnail,
        createdAt: new Date(),
        desc: item.volumeInfo.subtitle || "",
        genre: item.volumeInfo.categories[0],
        ISBN: item.volumeInfo.industryIdentifiers[0].identifier,
        publishedDate: new Date(item.volumeInfo.publishedDate),
        inLibrary: false,
        rating: 0,
        reviewCount: 0,
        shelfNumber: 0,
        views: 0,
        reviewsList: [],
        viewsList: [],
        wishList: [],
        wishlistCount: 0,
        approximateDemand: 0,
        previewLink: item.volumeInfo.previewLink,
        ID: "",
        updatedAt: new Date(),
      }),
  );

  return {
    ...response,
    data: { totalItems: response.data.totalItems, books: books },
  };
};

export const useGoogleGetAllBooksAPI = (
  request: GoogleGetAllBooksRequest,
  enabled = true,
): UseQueryResult<GoogleGetAllBooksResponse, AxiosError> => {
  return useQuery<GoogleGetAllBooksResponse, AxiosError>(
    [QueryKeys.GET_ALL_BOOKS],
    () => getGoogleAllBooksAPI(request),
    {
      enabled,
    },
  );
};
