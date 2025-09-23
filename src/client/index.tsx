import "./styles.css";

import React, { useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import usePartySocket from "partysocket/react";

// The type of messages we'll be receiving from the server
import type { OutgoingMessage } from "../shared";

function App() {
  // The number of connections we're currently displaying
  const [counter, setCounter] = useState(0);
  // A map of connection IDs for tracking
  const connections = useRef<Set<string>>(new Set());
  // Connect to the PartyServer server
  const socket = usePartySocket({
    room: "default",
    party: "globe",
    onMessage(evt) {
      const message = JSON.parse(evt.data as string) as OutgoingMessage;
      if (message.type === "add-marker") {
        // Add the connection to our set
        connections.current.add(message.position.id);
        // Update the counter
        setCounter(connections.current.size);
      } else {
        // Remove the connection from our set
        connections.current.delete(message.id);
        // Update the counter
        setCounter(connections.current.size);
      }
    },
  });


  return (
    <div className="App">
      <h1>Where's everyone at?</h1>
      {counter === 1 ? (
        <p>
          <b>1</b> person connected. Waiting for all participants to join...
        </p>
      ) : counter > 1 ? (
        <p>
          <b>{counter}</b> people connected. Everyone is here! 🎉
        </p>
      ) : (
        <p>&nbsp;</p>
      )}

      {counter >= 2 ? (
        <div className="special-message">
          <div className="animated-cloud">☁️</div>
          <p className="special-text">
            <span className="highlight">Cloudflare</span> × <span className="highlight">Amir Dotan</span>
            <br />
            <span className="subtitle">Solution Engineering interview process begins</span>
          </p>
        </div>
      ) : (
        /* Simple cloud when less than 2 people */
        <div className="cloud-container">
          <div className="simple-cloud">☁️</div>
          <div className="connection-count">{counter} {counter === 1 ? "connection" : "connections"}</div>
        </div>
      )}

      {/* Let's give some credit */}
      <p>
        Powered by <a href="https://cobe.vercel.app/">🌏 Cobe</a>,{" "}
        <a href="https://www.npmjs.com/package/phenomenon">Phenomenon</a> and{" "}
        <a href="https://npmjs.com/package/partyserver/">🎈 PartyServer</a>
      </p>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
createRoot(document.getElementById("root")!).render(<App />);
