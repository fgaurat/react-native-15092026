// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Todo, Todos } from '../core/Todo'



// export type NewTodo = Pick<Todo, 'title'>;



// Define a service using a base URL and expected endpoints
export const todosApi = createApi({
  reducerPath: 'todosApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.EXPO_PUBLIC_BASE_URL_TODOS }),
  tagTypes: ['todos'],
  endpoints: (builder) => ({
    getTodos:builder.query<Todos, void>({
        query:()=>'todos/',
        providesTags:['todos']
    }),
    getTodoById: builder.query<Todo, string>({
      query: (id) => `todos/${id}`,
    }),
    addTodo:builder.mutation<Todo,Partial<Todo>>({
        query:({title})=>({
            url:'todos',
            method:"POST",
            body:{title,completed:false},
        }),
        invalidatesTags:['todos']
    })
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetTodoByIdQuery,useGetTodosQuery,useAddTodoMutation } = todosApi