"use client"
import React,{useState,useRef} from 'react'
import Image from 'next/image';
import { MdCloudUpload , MdDelete} from "react-icons/md";
import { AiFillFileImage } from "react-icons/ai";


const Pictureuploader = () => {
    const [fileName, setFileName] = useState("No Selected file")
    const [image, setImage] = useState(null)
    const fileInput = useRef(null)

  return (
    <div className='w-full h-full flex flex-col justify-center items-center mt-8'>

        <form action="" onClick={() => fileInput.current.click()}
            className='flex flex-col justify-center items-center  border-2 border-dashed border-[#1475cf] h-[300px] w-[500px] rounded-md'>
            {/* hide the fileinput */}
            <input ref={fileInput} type="file" id="file"
                onChange={({target: {files}}) => {
                    files[0] && setFileName(files[0].name)
                    if(files[0]) setImage(URL.createObjectURL(files[0]))
                }}
             hidden/>
             
            {/* display the image or the icon */}
            { image ?
            <Image src={image} alt="image" width={250} height={250}/>
            :
            <>
            <MdCloudUpload className='h-10 w-10 text-[#1475cf]'/>
            <p className='font-medium mt-2 text-[#1475cf] '> Browse Files to Upload </p>
            </>
            }
        </form>

        {/* display the file name & the delete icon */}
        <div className='flex justify-between items-center mt-3 rounded-md bg-[#e9f0ff] px-6 py-3'>
            <AiFillFileImage className='h-6 w-6 text-[#1475cf]'/>
            <p className='font-medium text-sm mt-2 ms-2 '>{fileName}</p>
            <MdDelete className='h-6 w-6 text-[#1475cf] ms-2'
            onClick={()=>{
                setFileName('No Selected file')
                setImage(null)
            }}/>
        </div>

        

    </div>
  )
}

export default Pictureuploader