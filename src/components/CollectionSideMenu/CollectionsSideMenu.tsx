import FolderIcon from '@mui/icons-material/Folder'
import useCollections from '../../hooks/useCollections'
import cn from 'classnames'
import { Link, useParams } from 'react-router-dom'
import useMediaQuery from '../../hooks/useMediaQuery'

const CollectionsSideMenu = () => {
  const collectionsQuery = useCollections()
  const { collectionid } = useParams()
  const isSmallScreen = useMediaQuery('(max-width: 768px)')

  if (isSmallScreen) return null

  return (
    <div className="bg-secondaryBgColor w-60 h-full">
      <div className=" text-[#b1b1b5] font-semibold p-5">Collections</div>
      <ul>
        {collectionsQuery.data?.map((collection) => (
          <Link
            to={`../todos/${collection.id}`}
            className={cn(
              'h-12 flex flex-wrap content-center cursor-pointer hover:bg-[#272732] pl-5',
              { 'bg-[#272732]': collectionid === collection.id }
            )}
            key={`collection-${collection.id}`}
          >
            <FolderIcon />
            <span className="ml-2">{collection.name}</span>
          </Link>
        ))}
      </ul>
    </div>
  )
}

export default CollectionsSideMenu
