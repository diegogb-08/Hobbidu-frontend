import React from 'react'

function InputForm({
  type,
  name,
  length,
  onChange,
  onKeyDown,
  value,
  style,
  title,
  icon,
  onClick,
  error,
}) {
  return (
    <div className="inputComponent">
      <input
        className="inputText"
        type={type}
        name={name}
        maxLength={length}
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={value}
        style={style}
        required
      ></input>
      <span className="floating-label">{title}</span>
      {icon && (
        <div className="iconInput" onClick={onClick}>
          {icon}
        </div>
      )}
      {!icon && <div className="spacerCorrector"></div>}
      <span className="error">{error}</span>
    </div>
  )
}

export default InputForm
