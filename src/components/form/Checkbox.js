const Checkbox = (props) => {
  return (
    <div className="form-check float-start">
      <input
        type="checkbox"
        id={props.name}
        name={props.name}
        checked={props.checked}
        onChange={props.onChange}
        value={props.value}
        key={props.key}
        className="form-check-input"
      />
      <label htmlFor={props.name} className="form-check-label">
        {props.title}
      </label>
    </div>
  );
};

export default Checkbox;