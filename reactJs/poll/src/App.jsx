import { useState } from "react";
import PollWidget from "./components/Poll";

export default function App() {
  const [latestOptions, setLatestOptions] = useState(null);

  const pollData = {
    pollId: "p1",
    title: "Which JS framework do you prefer?",
    isMultiple: true,
    options: [
      { id: "1", text: "React", votes: 1 },
      { id: "2", text: "Vue", votes: 2 },
      { id: "3", text: "Svelte", votes: 2 },
    ],
  };

  const handleVote = (pollId, updatedOptions) => {
    console.log("User voted", pollId, updatedOptions);
    setLatestOptions(updatedOptions);
  };

  const handleRevote = (pollId, updatedOptions) => {
    console.log("User revoted", pollId, updatedOptions);
    setLatestOptions(updatedOptions);
  };

  return (
    <>
      <PollWidget
        pollId={pollData.pollId}
        title={pollData.title}
        isMultiple={pollData.isMultiple}
        options={pollData.options}
        onVote={handleVote}
        onRevote={handleRevote}
      />

      {latestOptions && (
        <pre style={{ width: 350, margin: "20px auto", fontSize: 12 }}>
          Latest options from widget:
          {JSON.stringify(latestOptions, null, 2)}
        </pre>
      )}
    </>
  );
}