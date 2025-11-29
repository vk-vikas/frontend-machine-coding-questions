import { useState, useMemo } from "react";

export default function PollWidget({
  pollId,
  title,
  isMultiple = false,
  options: initialOptions,
  onVote,
  onRevote,
}) {
  const [options, setOptions] = useState(initialOptions);
  const [selected, setSelected] = useState([]);
  const [hasVoted, setHasVoted] = useState(false);

  const totalVotes = useMemo(
    () => options.reduce((acc, o) => acc + o.votes, 0),
    [options]
  );

  const handleSelect = (id) => {
    if (hasVoted) return;

    if (isMultiple) {
      setSelected((prev) =>
        prev.includes(id)
          ? prev.filter((x) => x !== id)
          : [...prev, id]
      );
    } else {
      setSelected([id]);
    }
  };

  const handleVote = () => {
    if (selected.length === 0) return;

    const updatedOptions = options.map((opt) =>
      selected.includes(opt.id)
        ? { ...opt, votes: opt.votes + 1 }
        : opt
    );

    setOptions(updatedOptions);
    setHasVoted(true);

    onVote?.(pollId, updatedOptions);
  };

  const handleReVote = () => {
    const updatedOptions = options.map((opt) =>
      selected.includes(opt.id)
        ? { ...opt, votes: opt.votes - 1 }
        : opt
    );

    setOptions(updatedOptions);
    setSelected([]);
    setHasVoted(false);

    onRevote?.(pollId, updatedOptions);
  };

  const getPercentage = (votes) => {
    if (totalVotes === 0) return 0;
    return Math.round((votes / totalVotes) * 100);
  };

  return (
    <div
      style={{
        width: "350px",
        margin: "20px auto",
        padding: "16px",
        border: "1px solid #ccc",
        borderRadius: "10px",
        fontFamily: "sans-serif",
      }}
    >
      <h3 style={{ marginBottom: "12px" }}>{title}</h3>

      {options.map((option) => {
        const percent = getPercentage(option.votes);
        const isSelected = selected.includes(option.id);

        return (
          <div key={option.id} style={{ marginBottom: "16px" }}>
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                cursor: hasVoted ? "default" : "pointer",
              }}
            >
              <input
                type={isMultiple ? "checkbox" : "radio"}
                checked={isSelected}
                disabled={hasVoted}
                onChange={() => handleSelect(option.id)}
              />
              <span>{option.text}</span>

              {/* Show percentage + count after voting */}
              {hasVoted && (
                <span style={{ marginLeft: "auto", fontSize: "14px" }}>
                  {percent}% ({option.votes} votes)
                </span>
              )}
            </label>

            {/* Progress bar after voting */}
            {hasVoted && (
              <div
                style={{
                  height: "6px",
                  width: "100%",
                  background: "#eee",
                  borderRadius: "4px",
                  overflow: "hidden",
                  marginTop: "6px",
                }}
              >
                <div
                  style={{
                    width: `${percent}%`,
                    height: "100%",
                    background: "#4a90e2",
                  }}
                />
              </div>
            )}
          </div>
        );
      })}

      <div style={{ display: "flex", gap: "10px", marginTop: "12px" }}>
        {!hasVoted ? (
          <button
            onClick={handleVote}
            style={{
              padding: "8px 14px",
              borderRadius: "6px",
              border: "none",
              background: "#4caf50",
              color: "white",
              cursor: "pointer",
            }}
          >
            Vote
          </button>
        ) : (
          <button
            onClick={handleReVote}
            style={{
              padding: "8px 14px",
              borderRadius: "6px",
              border: "none",
              background: "#e74c3c",
              color: "white",
              cursor: "pointer",
            }}
          >
            Re-vote
          </button>
        )}
      </div>
    </div>
  );
}