import { gql } from "@apollo/client";

export const ALL_BOOKS = gql`
    query{
        allBooks{
            title
            author
            published
        }
    }
`
export const ALL_AUTHORS = gql `
    query{
        allAuthors{
            name
            born
            bookCount
        }
    }
`

export const ADD_BOOK = gql `
    mutation addBook($title: String!, $author:String!, $published: Int!, $genres: [String!]!){
        addBook(title: $title, author: $author, published: $published, genres: $genres){
            title
        }
    }
`

export const EDIT_AUTHOR_BIRTHYEAR = gql `
    mutation editAuthor($name: String!, $year: Int!){
        editAuthor(name: $name, setBornTo: $year){
            name
            born
        }
    }
`