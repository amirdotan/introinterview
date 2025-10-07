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
  // State to track if examination tree is shown
  const [showExamination, setShowExamination] = useState(false);
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
          <b>{counter}</b> people connected. Everyone is here! Welcome Ozgur 🎉
        </p>
      ) : (
        <p>&nbsp;</p>
      )}

      {counter >= 2 ? (
        <div className="special-message">
          <div className="animated-cloud">☁️</div>
          <p className="special-text">
            <span className="highlight">Ozgur</span> × <span className="highlight">Amir Dotan</span>
            <br />
            <span className="subtitle">Solution Engineering interview process begins</span>
          </p>
          <button 
            className="examine-button"
            onClick={() => setShowExamination(!showExamination)}
          >
            {showExamination ? "Hide Examination" : "Examine Fit"}
          </button>
        </div>
      ) : (
        /* Simple cloud when less than 2 people */
        <div className="cloud-container">
          <div className="simple-cloud">☁️</div>
          <div className="connection-count">{counter} {counter === 1 ? "connection" : "connections"}</div>
        </div>
      )}

      {/* Examination Tree */}
      {counter >= 2 && showExamination && (
        <div className="examination-tree">
          <div className="tree-header">
            <h3>Fit Potential Examination</h3>
          </div>
          <div className="tree-branches">
            <div className="branch">
              <div className="branch-node">
                <h4>Alignment to Mission and Values</h4>
                <div className="values-content">
                  <div className="values-section">
                    <h5>Cloudflare's Mission andValues</h5>
                    <ul>
                      <li>Building a better internet</li>
                      <li>The Internet as an enabler of society</li>
                      <li>Supporting democracies</li>
                      <li>Accessibility and Free options</li>
                    </ul>
                  </div>
                  <div className="values-section">
                    <h5>Amir's Passion and Values</h5>
                    <ul>
                      <li>Internet as transformative force for society</li>
                      <li>Passionate about putting technology for good use - experienced in it:
                        <ul className="sub-list">
                          <li>Impact startup co-founder</li>
                          <li>LSE MISDI</li>
                          <li>HUJI Technology Society & Networks</li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
              <div className="branch">
                <div className="branch-node">
                  <h4>Alignment to Position</h4>
                  <div className="values-content">
                    <div className="values-section">
                      <h5>Cloudflare's Requirements</h5>
                      <ul>
                        <li>Customer's Technical advocate</li>
                        <li>Translating technical to business value</li>
                        <li>Passionate about the internet and utilizing it</li>
                      </ul>
                    </div>
                    <div className="values-section">
                      <h5>Amir's Strengths</h5>
                      <ul>
                        <li>Experienced with customer's technical advocacy and value driving:
                          <ul className="sub-list">
                            <li>Tech lead in startup</li>
                            <li>Technical Solutions Consultant</li>
                            <li>Closed 5 figure deals through tailored technical work</li>
                          </ul>
                        </li>
                        <li>Internet and technical passion:
                          <ul className="sub-list">
                            <li>Experienced in the cybersecurity domain</li>
                            <li>Experienced in translating technical to non-technical as lecturer</li>
                            <li>Passionate to learn on technical protocols</li>
                          </ul>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
          </div>
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
