import {gql} from '@apollo/client';

export const LOGIN_USER = gql`
mutation login ($email: String!, $password: String!) {
    login (email: $email, $password: $password){
        token
        user{
            _id
            username
        }
    }
}
`;

export const ADD_USER = gql`
mutation addUser($username: String!, $email:String!, $password:String!){
    adduser(username: $username, email:$email, password:$password){
        token
        user {
            _id
            username
        }
    }
}
`;

export const SAVE_BOOK = gql`
mutation saveBook($bookData: BootInput!){
    saveBook(bookData: $bookData){
        _id
        username
        email
        savedBooks {
            bookId
            authors
            image
            description
             title 
             link
        }
    }
}
`;