import React from "react";

export default function Alert({ alert }) {
  const capitalise = (word) => {
    if (word === "danger") {
      word = "error";
    }
    let newAlert = word.charAt(0).toUpperCase();
    return newAlert + word.slice(1);
  };
  return (
    alert && (
      <div
        className={`alert alert-${alert.type} alert-dismissible fade show`}
        role="alert"
        style={{ height: "50px" }}
      >
        <strong>{capitalise(alert.type)}</strong> :{alert.message}
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
    )
  );
}
