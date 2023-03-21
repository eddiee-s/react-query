import { useQuery } from "@tanstack/react-query"
import { getPosts } from "./api/posts"

const PostList2 = () => {
    const postQuery = useQuery({
        queryKey: ['posts'],
        queryFn: getPosts,
    })

    if (postQuery.status === 'loading') return <h1>Loading...</h1>
    if (postQuery.status === 'error') {
        return <h1>{JSON.stringify(postQuery.error)}</h1>
    }

    return (
        <div>
            <h1>PostList2</h1>
            <ol>
                {postQuery.data.map(post => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ol>
        </div>
    )
}

export default PostList2