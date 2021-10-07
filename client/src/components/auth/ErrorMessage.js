import React from 'react'

const ErrorMessage = ({ title, content }) => {

  function capitalize(title) {
    return title
      .split(' ')
      .map((word) => {
        return word[0].toUpperCase() + word.slice(1)
      })
      .join(' ')
  }

  return (
    <div className="card text-white bg-danger mb-3 mt-4 w-100">
      <div className="card-header"><i class="fas fa-exclamation-triangle"></i> Error!</div>
      <div className="card-body">
        <h5 className="card-title">{capitalize(title)}</h5>
        <p className="card-text">{content}</p>
      </div>
    </div>
  )

}

export default ErrorMessage