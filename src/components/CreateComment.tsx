import { useState } from "react";
import { IComment } from "@libs/types";
import axios from "axios";
import { mutate } from "swr";

const CreateComment = ({ postId }) => {
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const id = Math.floor(Math.random() * 1000);

    const FAKE_DATA = {
      id,
      content: comment,
      createdAt: Date.now(),
      clientOnly: true,
    };

    mutate(
      `/posts/${postId}/comments?_sort=createdAt&_order=desc`,
      (comments: IComment[]) => [FAKE_DATA, ...comments],
      false
    );
    setComment("");

    await axios({
      method: "POST",
      url: `/posts/${postId}/comments`,
      data: {
        id,
        content: comment,
        createdAt: Date.now(),
      },
    });

    mutate(`/posts/${postId}/comments?_sort=createdAt&_order=desc`);
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-50">
      <textarea
        cols={3}
        className="form-control"
        placeholder="Write your dream comment:)"
        onChange={(e) => setComment(e.target.value)}
        value={comment}
      ></textarea>
      <button className="btn btn-outline-warning" type="submit">
        Add comment
      </button>
    </form>
  );
};

export default CreateComment;
