// src/components/ReactionButtons.tsx
import React, { useState, useEffect } from "react";
import { useBlog } from "../context/BlogContext";

interface ReactionButtonsProps {
  postId: string;
  targetId?: string; // comment id OR reply id
  parentCommentId?: string; // for nested replies
  initialReactions?: { [key: string]: number };
  initialReactedBy?: { [userId: string]: string };
  userId: string;
}

const reactionEmojis = ["👍", "❤️", "😂", "😮", "😢", "😡"];

const ReactionButtons: React.FC<ReactionButtonsProps> = ({
  postId,
  targetId,
  parentCommentId,
  initialReactions = {},
  initialReactedBy = {},
  userId,
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
      await addReaction(postId, emoji, userId, targetId, parentCommentId);

      // optimistic update
      setReactions((prev) => ({
        ...prev,
        [emoji]:
          reactedBy[userId] === emoji
            ? (prev[emoji] || 1) - 1
            : (prev[emoji] || 0) + 1,
      }));

      setReactedBy((prev) => ({
        ...prev,
        [userId]: prev[userId] === emoji ? "" : emoji,
      }));
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
            reactedBy[userId] === emoji
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
          title={emoji}
        >
          {emoji}
        </button>
      ))}
    </div>
  );
};

export default ReactionButtons;
