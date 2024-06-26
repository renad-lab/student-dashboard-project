import React, { useState } from "react";
import "./StudentCard.css";

function StudentCard({ record }) {
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [notes, setNotes] = useState(record.notes);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  const handleAddNote = () => {
    const newNote = prompt("Enter new note:");
    if (newNote) {
      setNotes([...notes, { commenter: "User", comment: newNote }]);
    }
  };

  const handleDeleteNote = (index) => {
    setNotes(notes.filter((note, i) => i !== index));
  };

  const isOnTrack = (student) => {
    const certifications = student.certifications;
    const codewarsScore = student.codewars.current.total;

    const certificationsAreTrue =
      certifications.resume &&
      certifications.linkedin &&
      certifications.github &&
      certifications.mockInterview;

    const codewarsScoreOver600 = codewarsScore > 600;

    return certificationsAreTrue && codewarsScoreOver600;
  };

  const onTrack = isOnTrack(record);

  return (
    <div className={`studentcard ${onTrack ? "on-track" : "off-track"}`}>
      {/* Status */}
      <div className="onTrackStatus">{onTrack ? "On Track" : "Off Track"}</div>
      {/* Profile Details */}
      <div className="profile-details">
        {/* Student Name */}
        <p className="fullName">
          <strong>
            {onTrack ? "[On Track]" : "[Off Track]"}{" "}
            {record.names.preferredName} {record.names.middleName}{" "}
            {record.names.surname}
          </strong>
        </p>
        {/* Other profile details */}
        <p className="email">{record.username}</p>
        <p className="dob">
          <span className="greenText">Birthday:</span> {record.dob}
        </p>
        {/* Show Details Button */}
        <button className="showmore" onClick={toggleModal}>
          {showModal ? "Hide Details" : "Show Details"}
        </button>
      </div>
      {/* Profile Photo */}
      <img className="profilephoto" src={record.profilePhoto} alt="Profile" />
      {/* Modal */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={toggleModal}>
              ×
            </span>
            <button onClick={handleEdit}>{editMode ? "Done" : "Edit"}</button>
            {editMode && <button onClick={handleAddNote}>Add Note</button>}
            <div className="details-columns">
              <div className="column">
                <h3>Codewars Details:</h3>
                <p>Total: {record.codewars.current.total}</p>
                <p>Last Week: {record.codewars.current.lastWeek}</p>
              </div>
              <div className="column">
                <h3>Certifications:</h3>
                <p>Resume: {record.certifications.resume ? "✅" : "❌"}</p>
                <p>LinkedIn: {record.certifications.linkedin ? "✅" : "❌"}</p>
                <p>GitHub: {record.certifications.github ? "✅" : "❌"}</p>
                <p>
                  Mock Interview:{" "}
                  {record.certifications.mockInterview ? "✅" : "❌"}
                </p>
              </div>
              <div className="column">
                <h3>Scores:</h3>
                <p>
                  Assignments:{" "}
                  {JSON.stringify(record.cohort.scores.assignments)}
                </p>
                <p>Projects: {JSON.stringify(record.cohort.scores.projects)}</p>
                <p>
                  Assessments:{" "}
                  {JSON.stringify(record.cohort.scores.assessments)}
                </p>
              </div>
            </div>
            <h3>Notes:</h3>
            {notes.map((note, index) => (
              <div key={index}>
                <p>
                  {note.commenter}: {note.comment}
                </p>
                {editMode && (
                  <button onClick={() => handleDeleteNote(index)}>
                    Delete
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentCard;
