import {
  deleteCollection,
  postNewCollection,
} from '../../services/CollectionService'
import { useMutation, useQueryClient } from 'react-query'
import { Collection } from '../../types/CollenctionType'
import FolderIcon from '@mui/icons-material/Folder'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import AddCollectionForm from '../../components/AddCollectionForm/AddCollectionForm'
import Loader from '../../components/Loader/Loader'
import useCollections from '../../hooks/useCollections'
import { Link } from 'react-router-dom'

const CollectionPage = () => {
  const queryClient = useQueryClient()
  const collectionsQuery = useCollections()
  const newCollectionQuery = useMutation(postNewCollection, {
    onSuccess: () => {
      queryClient.invalidateQueries('collection')
    },
  })
  const deleteCollectionQuery = useMutation(deleteCollection, {
    onSuccess: () => {
      queryClient.invalidateQueries('collection')
    },
  })

  const onSubmit = (values: Omit<Collection, 'id' | 'createdAt'>) => {
    newCollectionQuery.mutate({ name: values.name })
  }

  const handleDeleteCollection = (collectionid: string) => {
    deleteCollectionQuery.mutate(collectionid)
  }

  return (
    <div className="w-full flex-col p-10 h-[calc(100%-5rem)]">
      <div className="mb-10 text-center">
        <h1 className="p-5 text-5xl mb-4">Collection List</h1>
        <p>
          Welcome to the collection page! It seems that there are no items in
          this collection yet. Don't worry, you can be the first to add
          something! To contribute to this collection, simply click on the 'Add
          New' button below
        </p>
      </div>
      <div className="w-full flex flex-col items-center h-[50%]">
        <AddCollectionForm onSubmit={onSubmit} />
        <div className="w-full flex flex-col flex-wrap content-center mt-5 h-full overflow-auto gap-2">
          {collectionsQuery.data?.map((collection) => (
            <div
              className="w-60 p-3 bg-secondaryBgColor rounded flex flex-wrap items-center"
              key={`collection-${collection.id}`}
            >
              <Link to={`../todos/${collection.id}`}>
                <FolderIcon className="mr-2" fontSize="large" />{' '}
                {collection.name}
              </Link>
              <span
                className="ml-auto text-red-500 cursor-pointer"
                onClick={() => handleDeleteCollection(collection.id)}
              >
                <DeleteForeverIcon />
              </span>
            </div>
          ))}
          {collectionsQuery.isLoading && newCollectionQuery.isLoading && (
            <Loader className="mt-5" />
          )}
        </div>
      </div>
    </div>
  )
}

export default CollectionPage
