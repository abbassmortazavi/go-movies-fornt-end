const Select = (props) => {
  return (
    <div className="form-group">
      <label className="float-start" htmlFor={props.name}>{props.title}</label>
      <select
        id={props.name}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        className="form-select"
      >
        {props.options.map((option) => (
          <option key={option.id} value={option.value}>
            {option.value}
          </option>
        ))}
      </select>
       <div className={props.errorDiv}>
                {props.errorMsg}
        </div>
    </div>
  );
};

export default Select;