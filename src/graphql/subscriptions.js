/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateAdmin = /* GraphQL */ `
  subscription OnCreateAdmin {
    onCreateAdmin {
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
export const onUpdateAdmin = /* GraphQL */ `
  subscription OnUpdateAdmin {
    onUpdateAdmin {
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
export const onDeleteAdmin = /* GraphQL */ `
  subscription OnDeleteAdmin {
    onDeleteAdmin {
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
export const onCreateTodo = /* GraphQL */ `
  subscription OnCreateTodo {
    onCreateTodo {
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
export const onUpdateTodo = /* GraphQL */ `
  subscription OnUpdateTodo {
    onUpdateTodo {
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
export const onDeleteTodo = /* GraphQL */ `
  subscription OnDeleteTodo {
    onDeleteTodo {
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
