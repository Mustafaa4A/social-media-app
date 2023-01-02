import Dropzone from "react-dropzone";
import { FaEdit } from 'react-icons/fa';
import { AiOutlineClose } from 'react-icons/ai';
import { BiCloudUpload } from 'react-icons/bi';
import { Fragment } from "react";

const DropzoneInput = ({onDrop, fields}) => {
  return (
    <Dropzone onDrop={onDrop}
      multiple={false}
    >
      {({getRootProps, getInputProps}) => (
        <section className="">
          <div {...getRootProps()} className='dropzone relative'>
            <input {...getInputProps()}></input>
            {!fields.picture ? (
              <>
                <BiCloudUpload size={25}/>
              <p>Updaload Image</p>
              </>
            ): (
                <Fragment>
                  <FaEdit size={20} className='' />
                  <p>{fields.picture.path}</p>
                  <div className="float absolute top-4 right-3 cursor-pointer" onClick={()=>fields.picture=''}>
                    <AiOutlineClose size={20}/>
                  </div>
                </Fragment>
            )}
            
          </div>
        </section>
      )}
    </Dropzone>
  )
}

export default DropzoneInput;