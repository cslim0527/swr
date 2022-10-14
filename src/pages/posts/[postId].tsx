import CreateComment from "@components/CreateComment";
import CommentCard from "@components/CommentCard";
import PostCard from "@components/PostCard";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IComment, IPost } from "@libs/types";
import Loader from "@components/Loader";
import useSWR from "swr";

const index = () => {
  const {
    query: { postId },
  } = useRouter();
  // const [post, setPost] = useState<IPost>(null);
  // const [comments, setComments] = useState<IComment[]>(null);
  // const getPost = async () => {
  //   const { data } = await axios.get(
  //     `/posts/${postId}?_sort=createdAt&_order=desc`
  //   );
  //
  //   setPost(data);
  // };
  //
  // const getComments = async () => {
  //   const { data } = await axios.get(
  //     `/posts/${postId}/comments?_sort=createdAt&_order=desc`
  //   );
  //
  //   setComments(data);
  // };
  //
  // useEffect(() => {
  //   postId && getPost();
  //   postId && getComments();
  // }, [postId]);

  const { data: posts, error: postsError } = useSWR<IPost[]>(
    "/posts?_sort=createdAt&_order=desc",
    {
      dedupingInterval: 10000000, // 인터벌 시간동안에는 서버로 재요청하지 않고 캐싱 데이터를 사용하도록 하는 옵션
    }
  );

  const { data: comments, error: commentsError } = useSWR<IComment[]>(
    `/posts/${postId}/comments?_sort=createdAt&_order=desc`
  );

  const postIndex = posts?.findIndex((post) => post.id === Number(postId));

  return (
    <div>
      {!posts[postIndex] && <Loader />}
      {posts[postIndex] && <PostCard data={posts[postIndex]} />}

      <CreateComment />

      {!comments && <Loader />}

      <h4>Comments</h4>
      {comments?.map((comment) => (
        <CommentCard key={comment.id} data={comment} />
      ))}
    </div>
  );
};

export default index;
