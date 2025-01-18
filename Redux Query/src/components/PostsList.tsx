import { useCreatePostMutation, useGetPostsQuery } from "../state/posts/postsApiSlice";
import { Post } from "../types/Post";

const PostsLists = () => {
  const {data: posts, isLoading, isError} = useGetPostsQuery({
    limit:5,
    offset:0
  });
  const [createPostMutation, {isLoading: isCreatingPost}] = useCreatePostMutation();

  if(isLoading) {
    return <div>isLoading</div>
  }

  if(isError) {
    return <div>Error...</div>
  }



  return (
    <div>
      <button onClick={() => {
        const post = {title: 'My new post'};
        createPostMutation(post);
      }}>{isCreatingPost ? "Creating" : "Create Post"}</button>
      <ul>
        {posts?.map((post: Post)=> {
          return <li key={post.id}>{post.title}</li>
        })}
      </ul>
    </div>
  )
}

export default PostsLists;