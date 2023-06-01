import { Link, Outlet } from 'react-router-dom'
import useCollections from '../hooks/useCollections'
import AddCircleIcon from '@mui/icons-material/AddCircle'

const Root = () => {
  const collectionQuery = useCollections()

  return (
    <>
      <header className="w-full h-16 bg-secondaryBgColor mb-1">
        <nav className="navbar bg-secondaryBgColor mb-2 h-16">
          <Link to="/" className="btn btn-ghost normal-case text-xl">
            Collections
          </Link>
          {collectionQuery.data && (
            <Link
              to={`todos/${collectionQuery.data[0]?.id}`}
              className="btn btn-ghost normal-case text-xl"
            >
              Todos
            </Link>
          )}
          <Link
            to="addTodo"
            className="ml-auto flex items-center bg-green-900 p-2 rounded-full mr-5"
          >
            <AddCircleIcon className="mr-2" />
            Add Todo
          </Link>
        </nav>
      </header>
      <Outlet />
    </>
  )
}

export default Root
