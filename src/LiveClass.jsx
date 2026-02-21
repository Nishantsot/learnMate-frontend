import React from "react";
import { useParams } from "react-router-dom";
import { JitsiMeeting } from "@jitsi/react-sdk";

export default function LiveClass() {

  const { roomId } = useParams();

  const tutorName = localStorage.getItem("userName") || "Tutor";

  return (

    <div style={{ height: "90vh" }}>

      <JitsiMeeting

        roomName={roomId}

        configOverwrite={{
          startWithAudioMuted: false,
          startWithVideoMuted: false,
          enableWelcomePage: false,
        }}

        interfaceConfigOverwrite={{
          SHOW_JITSI_WATERMARK: false,
        }}

        userInfo={{
          displayName: tutorName
        }}

        getIFrameRef={(iframe) => {
          iframe.style.height = "100%";
        }}

      />

    </div>

  );

}