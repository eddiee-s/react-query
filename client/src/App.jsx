import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react";
import PostList1 from "./PostList1";
import PostList2 from "./PostList2";


function App() {
  const [currentPage, setCurrentPage] = useState(<PostList1 />);

  return (
    <div>
      <button onClick={() => setCurrentPage(<PostList1 />)}>
        Posts List 1
      </button>
      <button onClick={() => setCurrentPage(<PostList2 />)}>
        Posts List 2
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