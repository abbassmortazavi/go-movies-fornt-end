const Checkbox = (props) => {
  return (
    <div className="form-check">
      <input
        type="checkbox"
        id={props.name}
        name={props.name}
        checked={props.checked}
        onChange={props.onChange}
        value={props.value}
        checked={props.checked}
        className="form-check-input"
      />
      <label htmlFor={props.name} className="form-check-label">
        {props.title}
      </label>
    </div>
  );
};

export default Checkbox;