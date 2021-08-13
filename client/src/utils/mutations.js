import { gql } from '@apollo/client';

export const ADD_PROFILE = gql`
    mutation addProfile($name: String!, $email: String!, $password: String!) {
        addProfile(name: $name, email: $email, password: $password) {
            token
            profile {
                _id
                name
            }
        }
    }
`;

export const ADD_DRINK = gql `
    mutation addDrink($profileId: ID!, $drink: String!) {
        addDrink(profileId: $profileId, drink: $drink) {
            _id
            name
            drinks
        }
    }
`;

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            profile {
                _id
                name
            }
        }
    }
`;

export const REMOVE_DRINK = gql`
    mutation removeDrink($drink: String!) {
        removeDrink(drink: $drink) {
            _id
            name
            drinks
        }
    }
`;