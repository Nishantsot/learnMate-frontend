import { useEffect, useRef, useState } from "react";

import {
  Bot,
  Trash2,
  Send,
  Sparkles,
  UserRound,
} from "lucide-react";

import { askAiTutor } from "./authService";

import "./StudentDashboard.css";
import "./StudentAiTutor.css";

export default function StudentAiTutor() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const [messages, setMessages] = useState([
    {
      role: "ai",
      text:
        "Hi! 👋 I'm LearnMate AI Tutor. What would you like to learn today?",
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
      const response =
        await askAiTutor(question);

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
      console.error(
        "AI Tutor error:",
        error
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "error",
          text:
            error?.response?.data?.message ||
            error?.message ||
            "AI Tutor is currently unavailable.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (
    event
  ) => {
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
        text:
          "Chat cleared. What would you like to learn?",
      },
    ]);

    setInput("");
  };

  return (
    <div className="student-dashboard-page">

      {/* HEADER */}

      <div className="student-dashboard-header">

        <div>

          <div className="student-dashboard-label">

            <Sparkles size={15} />

            AI LEARNING ASSISTANT

          </div>

          <h1>
            LearnMate AI Tutor
          </h1>

          <p>
            Ask questions about programming,
            science, mathematics, AI, general
            knowledge and other learning topics.
          </p>

        </div>

        <button
          type="button"
          className="ai-clear-btn"
          onClick={clearChat}
        >
          <Trash2 size={17} />

          Clear Chat
        </button>

      </div>


      {/* CHAT */}

      <div className="ai-chat-card">

        {/* TOP BAR */}

        <div className="ai-chat-top">

          <div className="ai-chat-bot">

            <div className="ai-chat-bot-icon">
              <Bot size={22} />
            </div>

            <div>

              <h4>
                LearnMate AI
              </h4>

              <span>
                AI Tutor • Online
              </span>

            </div>

          </div>

          <div className="ai-online-indicator">
            <span />
            Online
          </div>

        </div>


        {/* MESSAGES */}

        <div className="ai-messages">

          {messages.map(
            (message, index) => (

              <div
                key={index}
                className={
                  message.role ===
                  "user"
                    ? "message-row user-row"
                    : "message-row ai-row"
                }
              >

                {message.role !==
                  "user" && (

                  <div className="ai-avatar">
                    <Bot size={18} />
                  </div>

                )}

                <div
                  className={`message-bubble ${
                    message.role ===
                    "user"
                      ? "user-message"
                      : message.role ===
                        "error"
                      ? "error-message"
                      : "ai-message"
                  }`}
                >
                  {message.text}
                </div>

                {message.role ===
                  "user" && (

                  <div className="user-avatar">
                    <UserRound
                      size={18}
                    />
                  </div>

                )}

              </div>

            )
          )}


          {/* THINKING */}

          {loading && (

            <div className="message-row ai-row">

              <div className="ai-avatar">
                <Bot size={18} />
              </div>

              <div className="message-bubble ai-message ai-thinking">

                <span />
                <span />
                <span />

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
              setInput(
                e.target.value
              )
            }
            onKeyDown={
              handleKeyDown
            }
            placeholder="Ask anything you want to learn..."
            rows="2"
            disabled={loading}
          />

          <button
            type="button"
            onClick={
              sendMessage
            }
            disabled={
              loading ||
              !input.trim()
            }
          >

            <Send size={18} />

            {loading
              ? "Thinking..."
              : "Send"}

          </button>

        </div>


        <div className="ai-hint">

          Press Enter to send •
          Shift + Enter for new line

        </div>

      </div>

    </div>
  );
}