import { useState } from "react";
import { Todo } from "../../core/Todo";

const useSaveTodo = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const url = process.env.EXPO_PUBLIC_URL_TODOS;

  const saveTodo = async (todo: Todo) => {
    setIsLoading(true);
    try {
      await fetch(url, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(todo),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { saveTodo, isLoading };
};

export { useSaveTodo };
