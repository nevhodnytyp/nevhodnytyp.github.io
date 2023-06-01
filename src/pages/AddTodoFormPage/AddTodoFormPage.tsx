import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import useCollections from '../../hooks/useCollections'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { object, string } from 'yup'
import cn from 'classnames'
import { useMutation, useQueryClient } from 'react-query'
import { postNewTodo } from '../../services/TodoService'
import { Todo } from '../../types/TodoType'
import { redirect } from 'react-router-dom'

const schema = object().shape({
  title: string().required(),
  collectionId: string().required(),
  description: string().required(),
  endDate: string().required(),
})

export const AddTodoFormPage = () => {
  const collectionsQuery = useCollections()
  const queryClient = useQueryClient()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
    control,
  } = useForm<Omit<Todo, 'id' | 'isDone'>>({
    defaultValues: {
      title: '',
      collectionId: '',
      description: '',
      endDate: '',
    },
    mode: 'onChange',
    resolver: yupResolver(schema),
  })
  const newTodoQuery = useMutation(postNewTodo)

  const handleFormSubmit = (values: Omit<Todo, 'id' | 'isDone'>) => {
    const newTodo = {
      collectionId: values.collectionId,
      title: values.title,
      description: values.description,
      endDate: values.endDate,
      isDone: false,
    }
    newTodoQuery.mutate(newTodo, {
      onSuccess: () => {
        queryClient.invalidateQueries('todos')
        redirect(newTodo.collectionId)
      },
    })
    reset()
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl my-4 text-center mb-5">Add new todo</h1>

      <form
        className="flex flex-col flex-wrap justify-center max-w-xl"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <div className="form-control">
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            type="text"
            {...register('title')}
            className={cn('input input-bordered', {
              'border-red-600': errors.title,
            })}
          />
          {errors.title?.message && (
            <p className="mt-1 pl-2 text-red-400">{errors.title.message}</p>
          )}
        </div>
        <div className="form-control mt-2">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            {...register('description')}
            className={cn('textarea textarea-bordered h-48', {
              'border-red-600': errors.description,
            })}
          />
          {errors.description?.message && (
            <p className="mt-1 pl-2 text-red-400">
              {errors.description.message}
            </p>
          )}
        </div>
        <div className="form-control w-full max-w-xs mt-2">
          <label className="label">
            <span className="label-text">Collection</span>
          </label>
          <select
            {...register('collectionId')}
            className={cn('select select-bordered', {
              'border-red-600': errors.collectionId,
            })}
          >
            {collectionsQuery.data &&
              collectionsQuery.data.map((colection) => (
                <option value={colection.id} key={`option-${colection.id}`}>
                  {colection.name}
                </option>
              ))}
          </select>
          {errors.collectionId?.message && (
            <p className="mt-1 pl-2 text-red-400">
              {errors.collectionId.message}
            </p>
          )}
        </div>
        <Controller
          name="endDate"
          control={control}
          render={({ field }) => {
            const endDateValue = field.value || new Date()
            return (
              <div className="mt-2">
                <label className="label">
                  <span className="label-text">Deadline</span>
                </label>
                <DatePicker
                  selected={new Date(endDateValue)}
                  dateFormat="dd.MM. yyyy hh:mm"
                  showTimeSelect
                  onChange={field.onChange}
                  className={cn('p-2 h-12 rounded bg-[#2a303c] w-full', {
                    'border-red-600': errors.endDate,
                  })}
                />
                {errors.endDate?.message && (
                  <p className="mt-1 pl-2 text-red-400">
                    {errors.endDate.message}
                  </p>
                )}
              </div>
            )
          }}
        />
        <button
          className="btn btn-outline btn-accent mt-5"
          type="submit"
          disabled={!isValid}
        >
          Button
        </button>
      </form>
    </div>
  )
}

export default AddTodoFormPage
