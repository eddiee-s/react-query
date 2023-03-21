import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useRef } from 'react'
import { createPost } from './api/posts'
import Post from './Post'

const CreatePost = ({ setCurrentPage }) => {
    const titleRef = useRef()
    const bodyRef = useRef()
    const queryClient = useQueryClient()

    const createPostMutation = useMutation({
        mutationFn: createPost,
        onSuccess: (data) => {
            queryClient.setQueryData(['posts', data.id], data) // adding data to cache load it instantly 
            queryClient.invalidateQueries(['posts'], { exact: true })
            setCurrentPage(<Post id={data.id} />)
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        createPostMutation.mutate({
            title: titleRef.current.value,
            body: bodyRef.current.value,
        })
    }

    return (
        <div>
            {createPostMutation.isError && JSON.stringify(createPostMutation.error)}
            <h1>Create Post</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input type="text" id='title' ref={titleRef} />
                </div>
                <div>
                    <label htmlFor="body">Body</label>
                    <input type="text" id='body' ref={bodyRef} />
                </div>
                <button disabled={createPostMutation.isLoading}>
                    {createPostMutation.isLoading ? 'Loading...' : 'Create'}
                </button>
            </form>
        </div>
    )
}

export default CreatePost