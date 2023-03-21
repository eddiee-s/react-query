import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

const POSTS = [
  { id: 1, title: 'Post 1' },
  { id: 2, title: 'Post 2' }
]


function App() {
  console.log(POSTS)
  const queryCLient = useQueryClient()
  const postQuery = useQuery({
    queryKey: ['posts'],
    queryFn: () => wait(1000).then(() => [...POSTS])
  })

  const newPost = useMutation({
    mutationFn: title => {
      return wait(1000).then(() =>
        POSTS.push({ id: crypto.randomUUID(), title }))
    },
    onSuccess: () => {
      queryCLient.invalidateQueries(['posts'])
    }
  })

  if (postQuery.isLoading) return <h1>Loading...</h1>
  if (postQuery.isError) return <pre>{JSON.stringify(postQuery.error)}</pre>

  return (
    <div>
      {postQuery.data.map(post => (
        <div key={post.id}> {post.title} </div>
      ))}
      <button
        disabled={newPost.isLoading}
        onClick={() => newPost.mutate('New Post')}>
        Add new
      </button>
    </div>)
}

function wait(duration) {
  return new Promise(resolve => setTimeout(resolve, duration))
}
export default App
