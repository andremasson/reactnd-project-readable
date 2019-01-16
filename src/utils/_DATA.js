let sortingListings = [
  {
    id: 0,
    label: 'Vote Score',
    field: 'voteScore'
  },
  {
    id: 1,
    label: 'Date',
    field: 'timestamp'
  },
  {
    id: 2,
    label: 'Comments',
    field: 'commentCount'
  }
]

export function _getSortingListings () {
  return new Promise((res, rej) => {
    return res(sortingListings)
  })
}