import { Todo } from '../../types/TodoType'
import { useMemo } from 'react'
import TodoItem from './TodoItem'

export enum TodoFilter {
  all = 'ALL',
  active = 'ACTIVE',
  done = 'DONE',
}

type Props = {
  todos: Todo[]
  searchQuery: string
  todoFilter: TodoFilter
  onDeleteTodo: (todo: Todo) => void
  onDoneTodo: (todo: Todo) => void
}

const TodoList: React.FC<Props> = (props) => {
  const { todos, searchQuery, todoFilter, onDeleteTodo, onDoneTodo } = props

  const filteredTodos = useMemo(() => {
    let newTodos = [...todos]

    if (todoFilter === TodoFilter.active) {
      newTodos = todos.filter((todo) => !todo.isDone)
    }

    if (todoFilter === TodoFilter.done) {
      newTodos = todos.filter((todo) => todo.isDone)
    }

    if (searchQuery) {
      newTodos = newTodos.filter(
        (todo) =>
          todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          todo.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    return newTodos
  }, [searchQuery, todoFilter, todos])

  return (
    <div>
      {filteredTodos.map((todo) => (
        <TodoItem
          key={`todo-${todo.id}`}
          todo={todo}
          onDoneTodo={onDoneTodo}
          onDeleteTodo={onDeleteTodo}
        />
      ))}
    </div>
  )
}

export default TodoList
