const Button = ({type, onClick,children, className, disabled}) => {
    return (
        <button type={type} onClick={onClick} className={`btn ${className ?? ''}`} disabled={disabled}>{children}</button>
    )
}

export default Button;