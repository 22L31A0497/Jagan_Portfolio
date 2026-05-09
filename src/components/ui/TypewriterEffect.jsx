import React, { useEffect, useState } from "react";
import { cn } from "../../lib/utils";

export const TypewriterEffect = ({
  words = [],
  className,
  cursorClassName,
  typingSpeed = 80,
  deletingSpeed = 40,
  pauseTime = 1500,
}) => {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (words.length === 0) return;
    const current = words[wordIndex % words.length];
    let timeout;
    if (!isDeleting && text === current) {
      timeout = setTimeout(() => setIsDeleting(true), pauseTime);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setWordIndex((i) => i + 1);
    } else {
      timeout = setTimeout(() => {
        const next = isDeleting
          ? current.substring(0, text.length - 1)
          : current.substring(0, text.length + 1);
        setText(next);
      }, isDeleting ? deletingSpeed : typingSpeed);
    }
    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span className={cn("inline-flex items-center", className)}>
      <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">
        {text}
      </span>
      <span
        className={cn(
          "inline-block w-[3px] h-[1em] ml-1 bg-indigo-400 animate-pulse",
          cursorClassName
        )}
      />
    </span>
  );
};
