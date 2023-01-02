const Message = ({message}) => {
  return (
    <div className="block w-100 h-15 mx-3 my-1 bg-red-300 p-3 rounded-sm">
          <p className="text-lg px-3">{message}</p>
    </div>
    
  )
}

export default Message;