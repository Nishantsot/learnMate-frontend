import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { JitsiMeeting } from "@jitsi/react-sdk";

export default function LiveClass() {
  const { roomId } = useParams();
  const navigate = useNavigate();

  const userName =
    localStorage.getItem("userName") ||
    "LearnMate User";

  const role =
    localStorage.getItem("role") ||
    "STUDENT";

  // Room ID missing
  if (!roomId) {
    return (
      <div
        className="d-flex flex-column justify-content-center align-items-center text-white"
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg, #050816, #111936, #1e3a8a)",
        }}
      >
        <h3>Room Not Available</h3>

        <p className="text-light opacity-75">
          This live class room could not be found.
        </p>

        <button
          className="btn btn-primary mt-3"
          onClick={() =>
            navigate(
              role === "TUTOR"
                ? "/tutor/classes"
                : "/student/classes"
            )
          }
        >
          Back to Classes
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "#050816",
        overflow: "hidden",
      }}
    >
      <JitsiMeeting
        domain="meet.jit.si"

        roomName={`LearnMate-${roomId}`}

        configOverwrite={{
          startWithAudioMuted: false,
          startWithVideoMuted: false,

          enableWelcomePage: false,

          prejoinPageEnabled: true,

          disableDeepLinking: true,
        }}

        interfaceConfigOverwrite={{
          SHOW_JITSI_WATERMARK: false,
          SHOW_WATERMARK_FOR_GUESTS: false,

          MOBILE_APP_PROMO: false,
        }}

        userInfo={{
          displayName: userName,
        }}

        getIFrameRef={(iframe) => {
          iframe.style.width = "100%";
          iframe.style.height = "100%";
          iframe.style.border = "none";
        }}

        onReadyToClose={() => {
          if (role === "TUTOR") {
            navigate("/tutor/classes");
          } else {
            navigate("/student/classes");
          }
        }}
      />
    </div>
  );
}