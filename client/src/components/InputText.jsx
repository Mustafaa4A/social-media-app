const InputText = ({name, value, placeholder, onChange, probs}) => {
  return (
     <div class="relative z-0 mb-6 w-full group">
      <input name="floating_email" id="floating_email" className="input peer" onChange={onChange} {...probs} />
          <label for="floating_email" className="input-label">Email address</label>
      </div>
  )
}

export default InputText