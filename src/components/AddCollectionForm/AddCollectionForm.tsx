import { useForm } from 'react-hook-form'
import AddIcon from '@mui/icons-material/Add'
import { Collection } from '../../types/CollenctionType'
import { memo } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { object, string } from 'yup'

type Props = {
  onSubmit: (values: Omit<Collection, 'id' | 'createdAt'>) => void
}

const schema = object().shape({
  name: string().min(3).required(),
})

export const AddCollectionForm: React.FC<Props> = memo(({ onSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { name: '' },
    resolver: yupResolver(schema),
  })

  const handleFormSubmit = (values: Omit<Collection, 'id' | 'createdAt'>) => {
    onSubmit(values)
    reset()
  }

  return (
    <>
      <form
        className="flex flex-wrap justify-center"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <input
          type="text"
          {...register('name')}
          placeholder="Add new collection"
          className="input input-bordered mr-3"
        />
        <button
          type="submit"
          className="w-12 h-12 bg-slate-600 rounded text-3xl flex place-content-center flex-wrap cursor-pointer"
        >
          <AddIcon fontSize="inherit" />
        </button>
      </form>
      <p className="mt-2 text-red-600">{errors.name?.message}</p>
    </>
  )
})

export default AddCollectionForm
