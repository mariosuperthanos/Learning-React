// @ts-nocheck

import { useQuery } from "@tanstack/react-query"
import { getPosts } from "./api/posts"
import { getUser } from "./api/users"
import { getPost } from "./api/posts"


export default function Post({ id }) {
  const postQuery = useQuery({
    queryKey: ["posts", id],
    queryFn: () => getPost(id),
  })

  // if(postQuery.data !== undefined){
  //   console.log(postQuery.data);
  // }

  // const lastKey = postQuery?.data && postQuery.data.length > 0 ? postQuery.data[postQuery.data.length - 1] : null;

  const userQuery = useQuery({
    queryKey: ["users", postQuery.data?.userId],
    enabled: postQuery.data?.userId != null,
    queryFn: () => getUser(postQuery.data.userId),
  });

  if (postQuery.isLoading) return <h1>Loading...</h1>
  if (postQuery.status === "error") {
    return <h1>{JSON.stringify(postQuery.error)}</h1>
  }

  return (
    <>
      <h1>
        {postQuery.data.title} <br />
        <small>
          {postQuery.userId}
          {userQuery.isLoading
            ? "Loading User..."
            : userQuery.isError
            ? "Error Loading User"
            : userQuery.data.name}
        </small>
      </h1>
      <p>{postQuery.data.body}</p>
    </>
  )
}