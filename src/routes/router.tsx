import { createBrowserRouter } from 'react-router-dom'
import Root from './Root'
import CollectionPage from '../pages/CollectionPage/CollectionPage'
import TodoPage from '../pages/TodoPage/TodoPage'
import ErrorPage from './ErrorPage'
import AddTodoFormPage from '../pages/AddTodoFormPage/AddTodoFormPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <CollectionPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'todos/:collectionid',
        element: <TodoPage />,
      },
      {
        path: '/addTodo',
        element: <AddTodoFormPage />,
      },
    ],
  },
])
