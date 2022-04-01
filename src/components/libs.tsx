import React from "react";

export function LoadingButton() {
  return (
    <button
      type="button"
      className="btn btn-primary btn-large waves-effect waves-light"
      style={{ margin: "auto", display: "block",
        width: "200px",filter: "opacity(0.5)",
        color: "#fff"
        , fontSize: "15px", pointerEvents: "none" }}
    > Loading ....</button>
  )
}

export function DisabledButton() {
  return (
    <button
      type="button"
      className="btn btn-primary btn-large waves-effect waves-light"
      style={{ margin: "auto", display: "block",
        width: "200px",filter: "opacity(0.5)",
        color: "#fff"
        , fontSize: "15px", pointerEvents: "none" }}
    > Submit
    </button>
  )
}

export function FullPageSpinner() {
  return (
    <div className="spinner-border text-primary" role="status" style={{
      marginLeft: '50%',marginTop: '20%',width: '7rem',
      height:'7rem'}}>
      <span className="visually-hidden">Loading...</span>
    </div>
  )
}

export function PageSpinner () {
  return (
    <div className="spinner-border text-primary" role="status" style={{marginLeft: '50%',marginTop: '20%'}}>
      <span className="visually-hidden">Loading...</span>
    </div>
  )
}

export function LoadMoreSpinner () {
    return (
        <div className="spinner-border" style={{ marginLeft: '50%', marginTop: '10px' }} role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    )
}
