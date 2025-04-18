import React, { useEffect, useRef } from "react";
import Note from "./Note";

const Notes = ({ notes = [], setNotes }) => {
  const noteRefs = useRef([]);
  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    const updatedNotes = notes.map((note) => {
      // Check if the note already exists in localStorage
      // If it does, return an empty object (no changes)
      const savedNote = savedNotes.find((n) => n.id === note.id);
      if (savedNote) {
        return { ...note, position: savedNote.position };
      } else {
        const position = determineNewPosition();
        return { ...note, position };
      }
    });

    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  }, [notes.length]);

  const determineNewPosition = () => {
    const maxX = window.innerWidth - 200; //
    // Assuming note width is 200px
    const maxY = window.innerHeight - 200; // Assuming note height is 200px
    return {
      x: Math.floor(Math.random() * maxX), // a random number between 0 and maxX
      y: Math.floor(Math.random() * maxY),
    };
  };

  // console.log(noteRefs.current);
  const handleDragStart = (e, note) => {
    console.log("drag start", note.id, noteRefs.current[note.id]);
    const noteRef = noteRefs.current[note.id].current;
    const rectange = noteRef.getBoundingClientRect();

    // offsetX and offsetY are the distances from the mouse pointer to the top-left corner of the note
    // clientX and clientY are the mouse pointer coordinates
    // when the mouse button is pressed
    const offsetX = e.clientX - rectange.left;
    const offsetY = e.clientY - rectange.top;

    const startPosition = note.position;

    const handleMouseMove = (e) => {
      const newX = e.clientX - offsetX;
      const newY = e.clientY - offsetY;

      noteRef.style.left = `${newX}px`;
      noteRef.style.top = `${newY}px`;
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);

      const finalRectangle = noteRef.getBoundingClientRect();
      const newPosition = {
        x: finalRectangle.left,
        y: finalRectangle.top,
      };

      if (checkForOverlap(note.id)) {
        // If there's an overlap, revert to the original position
        noteRef.style.left = `${startPosition.x}px`;
        noteRef.style.top = `${startPosition.y}px`;
      } else {
        updateNotePosition(note.id, newPosition);
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const checkForOverlap = (id) => {
    const currentNote = noteRefs.current[id].current;
    const draggedReactangle = currentNote.getBoundingClientRect();

    return notes.some((note) => {
      if (note.id === id) return false; // Skip the current note

      const otherRectangle =
        noteRefs.current[note.id].current.getBoundingClientRect();

      // Axis-Aligned Bounding Box (AABB) method, which is a common
      // way to detect collisions between rectangular objects
      return (
        draggedReactangle.left < otherRectangle.right &&
        draggedReactangle.right > otherRectangle.left &&
        draggedReactangle.top < otherRectangle.bottom &&
        draggedReactangle.bottom > otherRectangle.top
      );
    });
  };

  const updateNotePosition = (id, newPosition) => {
    const updatedNotes = notes.map((note) =>
      note.id === id ? { ...note, position: newPosition } : note
    );
    setNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  return (
    <div>
      {notes.map((note) => (
        <Note
          ref={
            noteRefs.current[note.id] ||
            (noteRefs.current[note.id] = React.createRef())
            // (el) => (noteRefs.current[note.id] = el)
          }
          key={note.id}
          content={note.text}
          initialPosition={note.position}
          onMouseDown={(e) => handleDragStart(e, note)}
        />
      ))}
    </div>
  );
};

export default Notes;
