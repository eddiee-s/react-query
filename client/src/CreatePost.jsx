import { useMutation } from '@tanstack/react-query'
import React, { useRef } from 'react'
import { createPost } from './api/posts'
import Post from './Post'

const CreatePost = ({ setCurrentPage }) => {
    const titleRef = useRef()
    const bodyRef = useRef()

    const createPostMutation = useMutation({
        mutationFn: createPost,
        onSuccess: (data) => {
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