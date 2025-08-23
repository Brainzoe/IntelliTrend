// src/components/ReactionButtons.tsx
import React, { useState, useEffect } from "react";
import { useBlog } from "../context/BlogContext";

interface ReactionButtonsProps {
  postId: string;
  targetId?: string; // comment id OR reply id
  parentCommentId?: string; // for nested replies
  initialReactions?: { [key: string]: number };
  initialReactedBy?: { [userId: string]: string };
}

const reactionEmojis = ["👍", "❤️", "😂", "😮", "😢", "😡"];

const ReactionButtons: React.FC<ReactionButtonsProps> = ({
  postId,
  targetId,
  parentCommentId,
  initialReactions = {},
  initialReactedBy = {},
}) => {
  const { addReaction } = useBlog();

  const [reactions, setReactions] = useState(initialReactions);
  const [reactedBy, setReactedBy] = useState(initialReactedBy);

  useEffect(() => {
    setReactions(initialReactions);
  }, [JSON.stringify(initialReactions)]);

  useEffect(() => {
    setReactedBy(initialReactedBy);
  }, [JSON.stringify(initialReactedBy)]);

  const handleReact = async (emoji: string) => {
    try {
      const data = await addReaction(postId, emoji, targetId, parentCommentId);

      // update local state optimistically
      setReactions(data?.reactions || {});
      setReactedBy(data?.reactedBy || {});
    } catch (e) {
      console.error("Failed to react:", e);
    }
  };

  return (
    <div className="flex gap-1 flex-wrap">
      {reactionEmojis.map((emoji) => (
        <button
          key={emoji}
          onClick={() => handleReact(emoji)}
          className={`px-2 py-1 rounded text-sm transition ${
            reactedBy?.[emoji] ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
          }`}
          title={emoji}
        >
          {emoji} {reactions[emoji] || ""}
        </button>
      ))}
    </div>
  );
};

export default ReactionButtons;
