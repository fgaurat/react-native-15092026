import { useCallback, useState } from "react";

const useDeleteTodo = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const url = process.env.EXPO_PUBLIC_URL_TODOS;

  const deleteTodo = useCallback(async (id: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${url}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Suppression impossible (HTTP ${response.status})`);
      }
    } finally {
      setIsLoading(false);
    }
  }, [url]);

  return { deleteTodo, isLoading };
};

export { useDeleteTodo };
