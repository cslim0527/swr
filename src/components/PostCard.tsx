import { useRouter } from "next/router";
import { FC } from "react";
import { IPost } from "@libs/types";

const PostCard: FC<{ data: IPost }> = ({
  data: { content, createdAt, id, clientOnly },
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/posts/${id}`);
  };

  const classnames = clientOnly
    ? "border card w-50 bg-dark"
    : "card w-50 bg-dark";

  return (
    <div className={classnames} onClick={handleClick}>
      <p className="card-header">Post Id : {id}</p>
      <p className="card-body">{content}</p>
    </div>
  );
};

export default PostCard;
