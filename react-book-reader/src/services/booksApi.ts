import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface BookItemDTO {
    id: string;
    title: string;
    author: string;
    text: string;
    createdAt: string;
}

export const booksApi = createApi({
    reducerPath: 'booksApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:4353/api',
    }),
    endpoints: (builder) => ({
        getBooks: builder.query<BookItemDTO[], void>({
            query: () => '/books',
        }),
    }),
});

export const { useGetBooksQuery } = booksApi;