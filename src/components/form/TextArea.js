const Textarea = (props) => {
  return (
    <div className="form-group">
   <label htmlFor={props.name}>{props.title}</label>
      <textarea
        id={props.name}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
        placeholder={props.placeholder}
        rows={props.rows}
        className="form-control"
      />
        <div className={props.errorDiv}>
          {props.errorMsg}
        </div>
    </div>
  );
}
export default Textarea;