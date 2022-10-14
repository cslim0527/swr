import { FC } from "react";
import { IComment } from "@libs/types";

const CommentCard: FC<{ data: IComment }> = ({ data: { content } }) => {
  return (
    <div className=" card w-50 bg-dark">
      <p className="card-body">{content}</p>
    </div>
  );
};

export default CommentCard;
