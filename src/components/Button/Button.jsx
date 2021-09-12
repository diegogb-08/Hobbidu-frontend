import PropType from 'prop-types'
import Spinner from '../Spinner/Spinner'

const Button = ({ onClick, style, type, children, color = '', isLoading }) => {
  return (
    <button
      className={`buttonComponent button--${color}`}
      onClick={onClick}
      style={style}
      type={type}
      disabled={isLoading}
    >
      {!isLoading ? children : <Spinner style={{ width: 20, height: 20 }} />}
    </button>
  )
}

Button.prototype = {
  onClick: PropType.func.isRequired,
  children: PropType.string.isRequired,
  style: PropType.object,
  color: PropType.oneOf(['red']),
}

export default Button
