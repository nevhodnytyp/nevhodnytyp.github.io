import { Collection } from '../types/CollenctionType'

export const fetchCollections = async (): Promise<Collection[]> => {
  const response = await fetch(
    'https://6475966be607ba4797dc150e.mockapi.io/api/collections'
  )
  const data = await response.json()
  return data
}

export const postNewCollection = async (
  payload: Omit<Collection, 'id' | 'createdAt'>
): Promise<Collection[]> => {
  const response = await fetch(
    'https://6475966be607ba4797dc150e.mockapi.io/api/collections',
    {
      method: 'post',
      body: JSON.stringify(payload),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    }
  )
  const data = await response.json()
  return data
}

export const deleteCollection = async (
  collectionid: string
): Promise<Collection[]> => {
  const response = await fetch(
    `https://6475966be607ba4797dc150e.mockapi.io/api/collections/${collectionid}`,
    {
      method: 'delete',
    }
  )
  const data = await response.json()
  return data
}
