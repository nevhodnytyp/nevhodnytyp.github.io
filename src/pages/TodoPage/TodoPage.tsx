import { useMutation, useQuery, useQueryClient } from 'react-query'
import CollectionsSideMenu from '../../components/CollectionSideMenu/CollectionsSideMenu'
import TodoList, { TodoFilter } from '../../components/TodoList/TodoList'
import { deleteTodo, fetchTodos, updateTodo } from '../../services/TodoService'
import { useParams } from 'react-router-dom'
import useCollections from '../../hooks/useCollections'
import { useState } from 'react'
import useDebounce from '../../hooks/useDebounce'
import { Todo } from '../../types/TodoType'
import cn from 'classnames'

const TodoPage = () => {
  const { collectionid } = useParams<{ collectionid: string }>()
  const collectionsQuery = useCollections()
  const queryClient = useQueryClient()
  const todosQuery = useQuery(['todos', collectionid], () =>
    fetchTodos(collectionid as string)
  )
  const currentCollection = collectionsQuery.data?.find(
    (col) => col.id === collectionid
  )
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [todoFilter, setTodoFilter] = useState<TodoFilter>(TodoFilter.all)
  const debouncedValue = useDebounce<string>(searchQuery, 200)

  const updateTodoQuery = useMutation('todos', updateTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos')
    },
  })

  const deleteTodoQuery = useMutation('todos', deleteTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries('todos')
    },
  })

  const handleDeleteTodo = (todo: Todo) => {
    deleteTodoQuery.mutate(todo)
  }

  const handleTodoFilter = (filter: TodoFilter) => {
    setTodoFilter(todoFilter === filter ? TodoFilter.all : filter)
  }

  const handleDoneTodo = (todo: Todo) => {
    const newTodo: Todo = {
      id: todo.id,
      collectionId: todo.collectionId,
      title: todo.title,
      description: todo.description,
      endDate: todo.endDate,
      isDone: !todo.isDone,
    }
    updateTodoQuery.mutate(newTodo)
  }

  return (
    <div className="h-[calc(100%-5rem)] flex w-full">
      <CollectionsSideMenu />
      <div className="w-full flex flex-col">
        <div className="flex flex-col items-center">
          <h1 className="text-4xl my-4 text-center">
            {currentCollection?.name}
          </h1>
          <input
            type="text"
            placeholder="Search todos.."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input input-bordered input-primary max-w-xs mt-3"
          />
          <div className="flex gap-2 mt-3">
            <button
              className={cn('btn', {
                'bg-green-800': todoFilter === TodoFilter.all,
              })}
              onClick={() => handleTodoFilter(TodoFilter.all)}
            >
              ALL
              <div className="badge badge-secondary ml-2">
                {todosQuery.data?.length}
              </div>
            </button>
            <button
              className={cn('btn', {
                'bg-green-800': todoFilter === TodoFilter.active,
              })}
              onClick={() => handleTodoFilter(TodoFilter.active)}
            >
              Active
              <div className="badge badge-secondary ml-2">
                {todosQuery.data?.filter((todo) => !todo.isDone).length}
              </div>
            </button>
            <button
              className={cn('btn', {
                'bg-green-800': todoFilter === TodoFilter.done,
              })}
              onClick={() => handleTodoFilter(TodoFilter.done)}
            >
              done
              <div className="badge badge-secondary ml-2">
                {todosQuery.data?.filter((todo) => todo.isDone).length}
              </div>
            </button>
          </div>
        </div>
        <div className="flex justify-center overflow-auto mt-10">
          {todosQuery.data && (
            <TodoList
              todos={todosQuery.data}
              searchQuery={debouncedValue}
              todoFilter={todoFilter}
              onDeleteTodo={handleDeleteTodo}
              onDoneTodo={handleDoneTodo}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default TodoPage
