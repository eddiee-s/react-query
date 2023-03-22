import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { getPost } from "./api/posts";
import CreatePost from "./CreatePost";
import Post from "./Post";
import PostList1 from "./PostList1";
import PostList2 from "./PostList2";
import PostListInfinite from "./PostListInfinite";
import PostListPaginated from "./PostListPaginated";


function App() {
  const [currentPage, setCurrentPage] = useState(<PostList1 />);

  const queryClient = useQueryClient()

  const onHoverPostOneLink = () => {
    queryClient.prefetchQuery({
      queryKey: ['posts', 1],
      queryFn: () => getPost(1)
    })
  }

  return (
    <div>
      <button onClick={() => setCurrentPage(<PostList1 />)}>
        Posts List 1
      </button>
      <button onClick={() => setCurrentPage(<PostList2 />)}>
        Posts List 2
      </button>
      <button onMouseEnter={onHoverPostOneLink} onClick={() => setCurrentPage(<Post id={1} />)}>
        First Post
      </button>
      <button onClick={() => setCurrentPage(<CreatePost setCurrentPage={setCurrentPage} />)}>
        New Post
      </button>
      <button onClick={() => setCurrentPage(<PostListPaginated />)}>
        Post List Paginated
      </button>
      <button onClick={() => setCurrentPage(<PostListInfinite />)}>
        Post List Infinite
      </button>
      <br />
      {currentPage}
    </div>
  )
}

function wait(duration) {
  return new Promise(resolve => setTimeout(resolve, duration))
}
export default App
