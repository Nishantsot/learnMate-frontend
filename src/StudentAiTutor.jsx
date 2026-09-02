import { useEffect, useRef, useState } from "react";
import { askAiTutor } from "./authService";
import "./StudentAiTutor.css";

export default function StudentAiTutor() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Hi! 👋 I'm LearnMate AI Tutor. What would you like to learn today?",
    },
  ]);

  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, loading]);

  const sendMessage = async () => {
    const question = input.trim();

    if (!question || loading) {
      return;
    }

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: question,
      },
    ]);

    setInput("");
    setLoading(true);

    try {
      const response = await askAiTutor(question);

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          text:
            response?.answer ||
            "I couldn't generate an answer.",
        },
      ]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          role: "error",
          text:
            error?.message ||
            "AI Tutor is currently unavailable.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        role: "ai",
        text: "Chat cleared. What would you like to learn?",
      },
    ]);
  };

  return (
    <div className="content-area ai-page">

      {/* HEADER */}

      <div className="ai-header">
        <div>
          <h2 className="fw-bold mb-1">
            🤖 LearnMate AI Tutor
          </h2>

          <p className="text-muted mb-0">
            Your personal AI learning assistant
          </p>
        </div>

        <button
          className="btn btn-outline-danger"
          onClick={clearChat}
        >
          Clear Chat
        </button>
      </div>

      {/* CHAT CARD */}

      <div className="ai-chat-card">

        {/* MESSAGES */}

        <div className="ai-messages">

          {messages.map((message, index) => (
            <div
              key={index}
              className={
                message.role === "user"
                  ? "message-row user-row"
                  : "message-row ai-row"
              }
            >

              {message.role !== "user" && (
                <div className="ai-avatar">
                  🤖
                </div>
              )}

              <div
                className={`message-bubble ${
                  message.role === "user"
                    ? "user-message"
                    : message.role === "error"
                    ? "error-message"
                    : "ai-message"
                }`}
              >
                {message.text}
              </div>

              {message.role === "user" && (
                <div className="user-avatar">
                  👤
                </div>
              )}

            </div>
          ))}

          {/* THINKING */}

          {loading && (
            <div className="message-row ai-row">

              <div className="ai-avatar">
                🤖
              </div>

              <div className="message-bubble ai-message">
                <span className="thinking-dot">
                  .
                </span>
                <span className="thinking-dot">
                  .
                </span>
                <span className="thinking-dot">
                  .
                </span>
              </div>

            </div>
          )}

          <div ref={bottomRef} />

        </div>

        {/* INPUT */}

        <div className="ai-input-area">

          <textarea
            value={input}
            onChange={(e) =>
              setInput(e.target.value)
            }
            onKeyDown={handleKeyDown}
            placeholder="Ask anything about Java, React, Spring Boot, Python..."
            rows="2"
            disabled={loading}
          />

          <button
            onClick={sendMessage}
            disabled={
              loading || !input.trim()
            }
          >
            {loading ? "Thinking..." : "Send ➤"}
          </button>

        </div>

        <div className="ai-hint">
          Press Enter to send • Shift + Enter for
          new line
        </div>

      </div>
    </div>
  );
}