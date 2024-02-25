import { useUserContext } from "@/context/UserContext";
import { User } from "@/entity/User/User";
import { mockUsers } from "@/entity/User/User.mock";

interface settingsHookProps {}

interface settingsHook {
  user: User;
}

export const useSettings = ({}: settingsHookProps): settingsHook => {
  const { user } = useUserContext();

  return {
    user
  };
};
