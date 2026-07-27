import { forwardRef } from "react"

const Input = forwardRef((props, ref) => {
    return (
        <div className="mb-3">
            <label htmlFor={props.name}>
                {props.title}
            </label>
            <input
                type={props.type}
                className={props.className}
                id={props.name}
                label={props.name}
                ref={ref}
                placeholder={props.placeholder}
                onChange={props.onChange}
                value={props.value}
                autoComplete={props.autoComplete}
            />
            <div className={props.errorDiv}>
                {props.message}
            </div>
        </div>
    )
});

export default Input;