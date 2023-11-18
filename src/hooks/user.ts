import { getItem, removeItem, setItem } from "@/utils/storage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const USER_KEY = "user";

interface User {
  email: string;
}

export const useUserQuery = () => {
  return useQuery({
    queryKey: [USER_KEY],
    queryFn: () => getItem<User | null>(USER_KEY, null),
  });
};

interface MutationParams {
  onSuccess?: () => void;
}

export const useLogInMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: User) => setItem<User>(USER_KEY, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USER_KEY] });
    },
  });
};

export const useLogOutMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => removeItem(USER_KEY),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USER_KEY] });
    },
  });
};
