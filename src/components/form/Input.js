import { forwardRef } from "react"

const Input = forwardRef((props, ref) => {
    return (
        <div className="mb-3">
            <label className="form-label d-block text-start" htmlFor={props.name}>
                {props.title}
            </label>

            <input
                type={props.type}
                name={props.name}
                className={props.className}
                id={props.name}
                label={props.name}
                ref={ref}
                placeholder={props.placeholder}
                onChange={props.onChange}
                value={props.value}
                autoComplete={props.autoComplete}
            />
            <div className={`${props.errorDiv} text-start`}>
                {props.errorMsg}
            </div>
        </div>
    )
});

export default Input;