import { FC } from "react";
import { IComment } from "@libs/types";

const CommentCard: FC<{ data: IComment }> = ({
  data: { content, clientOnly },
}) => {
  const classnames = clientOnly
    ? "border card w-50 bg-dark"
    : "card w-50 bg-dark";
  return (
    <div className={classnames}>
      <p className="card-body">{content}</p>
    </div>
  );
};

export default CommentCard;
