/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getAdmin = /* GraphQL */ `
  query GetAdmin($id: ID!) {
    getAdmin(id: $id) {
      id
      name
      email
      phone
      imageUrl
      todo {
        items {
          id
          desc
          title
          category
          createdAt
          updatedAt
          adminTodoId
        }
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listAdmins = /* GraphQL */ `
  query ListAdmins(
    $filter: ModelAdminFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAdmins(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        email
        phone
        imageUrl
        todo {
          nextToken
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTodo = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      desc
      title
      category
      createdAt
      updatedAt
      adminTodoId
    }
  }
`;
export const listTodos = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        desc
        title
        category
        createdAt
        updatedAt
        adminTodoId
      }
      nextToken
    }
  }
`;
