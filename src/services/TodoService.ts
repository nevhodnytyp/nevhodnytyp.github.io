import { Todo } from '../types/TodoType'

export const fetchTodos = async (collectionId: string): Promise<Todo[]> => {
  const response = await fetch(
    `https://6475966be607ba4797dc150e.mockapi.io/api/collections/${collectionId}/todos`
  )
  const data = await response.json()
  return data
}

export const postNewTodo = async (
  payload: Omit<Todo, 'id'>
): Promise<Todo[]> => {
  const response = await fetch(
    `https://6475966be607ba4797dc150e.mockapi.io/api/collections/${payload.collectionId}/todos`,
    {
      method: 'post',
      body: JSON.stringify(payload),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }
  )
  const data = await response.json()
  return data
}

export const updateTodo = async (todo: Todo): Promise<Todo[]> => {
  const response = await fetch(
    `https://6475966be607ba4797dc150e.mockapi.io/api/collections/${todo.collectionId}/todos/${todo.id}`,
    {
      method: 'put',
      body: JSON.stringify(todo),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }
  )
  const data = await response.json()
  return data
}

export const deleteTodo = async (todo: Todo): Promise<Todo[]> => {
  const response = await fetch(
    `https://6475966be607ba4797dc150e.mockapi.io/api/collections/${todo.collectionId}/todos/${todo.id}`,
    {
      method: 'delete',
    }
  )
  const data = await response.json()
  return data
}
