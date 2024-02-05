import { useRouter } from "next/router";

interface BookGridItemHookProps {}

interface BookGridItemHook {
  handleBookItemClick: (ID: string) => void;
}

export const useBookGridItem =
  ({}: BookGridItemHookProps): BookGridItemHook => {
    const router = useRouter();
    const handleBookItemClick = (ID: string) => {
      if (ID) {
        router.replace(`/bookshelf/${ID}`);
      }
    };
    return {
      handleBookItemClick,
    };
  };
