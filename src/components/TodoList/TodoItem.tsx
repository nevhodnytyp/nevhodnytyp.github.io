import { Todo } from '../../types/TodoType'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined'
import cn from 'classnames'

type Props = {
  todo: Todo
  onDeleteTodo: (todo: Todo) => void
  onDoneTodo: (todo: Todo) => void
}

const TodoItem: React.FC<Props> = ({ todo, onDeleteTodo, onDoneTodo }) => {
  return (
    <li className="w-80 bg-secondaryBgColor rounded-xl mb-1 flex flex-col font p-5">
      <div className="flex mb-2">
        <TaskAltOutlinedIcon
          className={cn('hover:text-green-700 cursor-pointer mr-2', {
            'text-green-700': todo.isDone,
          })}
          onClick={() => onDoneTodo(todo)}
        />
        <h1 className="self-start mb-2">{todo.title}</h1>
        <span
          className="ml-auto text-red-500 cursor-pointer"
          onClick={() => onDeleteTodo(todo)}
        >
          <DeleteForeverIcon />
        </span>
      </div>

      <p className="text-left mb-2 text-slate-400">{todo.description}</p>
      <p className="self-start">
        Deadline: {new Date(todo.endDate).toLocaleString()}
      </p>
    </li>
  )
}

export default TodoItem
