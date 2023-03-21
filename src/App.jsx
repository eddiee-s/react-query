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
    queryFn: (obj) => wait(1000).then(() => {
      console.log(obj)
      return [...POSTS]
    })
  })

  // posts --> ["posts"]
  // posts/1 --> ["posts", post.id]
  // posts?authorId=1 --> ["posts", {authorId: 1}]
  // posts/2/comments --> ["posts", post.id, "comments"] 

  if (postQuery.isLoading) return <h1>Loading...</h1>
  if (postQuery.isError) return <pre>{JSON.stringify(postQuery.error)}</pre>

  return (
    <div>
      {postQuery.data.map(post => (
        <div key={post.id}> {post.title} </div>
      ))}
      <button
      // disabled={newPost.isLoading}
      // onClick={() => newPost.mutate('New Post')}
      >
        Add new
      </button>
    </div>)
}

function wait(duration) {
  return new Promise(resolve => setTimeout(resolve, duration))
}
export default App
