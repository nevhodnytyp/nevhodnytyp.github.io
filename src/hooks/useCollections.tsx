import { useQuery } from 'react-query'
import { fetchCollections } from '../services/CollectionService'

const useCollections = () => {
  const collectionsQuery = useQuery('collection', fetchCollections)
  return collectionsQuery
}

export default useCollections
