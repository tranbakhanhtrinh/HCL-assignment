import "./Input.scss";

const Input = ({ id, label, onChange, error, ...inputProps}) => {
    return (
        <div className="input mb-3">
            <label htmlFor={id} className="form-label">
                {label}
            </label>
            <input className={`form-control ${error ? "invalid" : ""}`} id={id} onChange={onChange}  {...inputProps}/>
            {error ? <div className="error-message" data-testid="error-message">{error}</div> : <div style={{height: 24}}></div>}
        </div>
    );
};

export default Input;
