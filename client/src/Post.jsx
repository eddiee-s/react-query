import { useQuery } from "@tanstack/react-query"
import { getPost } from "./api/posts"
import { getUser } from "./api/user"

const Post = ({ id }) => {
    const postQuery = useQuery({
        queryKey: ['posts', id],
        queryFn: () => getPost(id)
    })

    const userQuery = useQuery({
        queryKey: ['users', postQuery?.data?.userId],
        enabled: postQuery.data?.userId != null, // if there is data fetched from postQuery
        queryFn: () => getUser(postQuery.data.userId)
    })

    if (postQuery.status === 'loading') return <h1>Loading...</h1>
    if (postQuery.status === 'error') {
        return <h1>{JSON.stringify(postQuery.error)}</h1>
    }

    return (
        <>
            <h1>{postQuery.data.title}</h1>
            <small>
                {/* {postQuery.data.userId}  */}
                {userQuery.isLoading
                    ? "Loading..."
                    : userQuery.isError
                        ? "Error loading user"
                        : userQuery.data.name
                }
            </small>
            <p>
                {postQuery.data.body}
            </p>
        </>
    )
}

export default Post