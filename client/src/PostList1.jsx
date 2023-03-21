import { useQuery } from "@tanstack/react-query"
import { getPosts } from "./api/posts"

const PostList1 = () => {
    const postQuery = useQuery({
        queryKey: ['posts'],
        queryFn: getPosts,
    })
    //? ****postQuery.status vs postQuery.fetchStatus****
    /*** 
     * postQuery.status --> state: loading, error, paused, success... on page load
     * postQuery.fetchStatus --> state: fetching, idle ...when successfuly fetched but changing the page with same fetch results or when something changes
    */

    if (postQuery.status === 'loading') return <h1>Loading...</h1>
    if (postQuery.status === 'error') {
        return <h1>{JSON.stringify(postQuery.error)}</h1>
    }

    return (
        <div>
            <h1>PostList1</h1>
            <ol>
                {postQuery.data.map(post => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ol>
        </div>
    )
}

export default PostList1