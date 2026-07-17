const Alert = (props)=>{
    return (
        <div className={"text-center alert " + props.className} role="alert">
            {props.message}
        </div>
    )
}
export default Alert;