import React,{useState, useEffect} from 'react'
import styled from 'styled-components'
import { getStorage, ref,  uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../firebase'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Container = styled.div`
width: 100%;
height: 100%;
position: absolute;
top: 0;
left: 0;
background-color: rgba(28, 27, 27, 0.8);
display: flex;
align-items: center;
justify-content: center;
`
const Wrapper = styled.div`
width: 600px;
height: 600px;
background-color: ${({theme})=>theme.bgLighter};
color: ${({theme})=>theme.text};
padding: 20px;
display: flex;
flex-direction: column;
gap: 20px;
position: relative;
`
const Close = styled.div`
position: absolute;
top: 10px;
right: 10px;
cursor: pointer;
`
const Title = styled.h1`
text-align: center;
`
const Input = styled.input`
border: 1px solid ${({theme})=>theme.soft};
color: ${({theme})=>theme.text};
border-radius: 3px;
padding: 10px;
background-color: transparent;
`
const Desc = styled.textarea`
border: 1px solid ${({theme})=>theme.soft};
color: ${({theme})=>theme.text};
border-radius: 3px;
padding: 10px;
background-color: transparent;
`

const Button = styled.button`
border-radius: 3px;
border: none;
padding: 10px 20px;
font-weight: 500;
cursor: pointer;
background-color: ${({theme})=>theme.soft};
color: ${({theme})=> theme.textSoft};
`

const Label = styled.label`
font-size: 14px;
`
const Upload = ({setOpen}) => {

    
    const [video, setVideo] = useState(undefined)
    const [image, setImage] = useState(undefined)
    const [imgPer , setImgPerc] = useState(0)
    const [videoPer , setVideoPerc] = useState(0)
    const [input , setInput] = useState({})
    const [tags, setTags] = useState([])

    const navigate = useNavigate()

    const handleInput = (e)=>{
         setInput((prev)=>{
            return {...prev, [e.target.name]:e.target.value}
         })
    }
    const UploadFile = async(file, urlType)=>{
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name
      // Create a reference to 'mountains.jpg'
      const storageRef = ref(storage, fileName);
      const metadata = {
        contentType: 'image/jpeg'
      };
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on('state_changed',
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes)) * 100;
          urlType === "videoUrl" ? setVideoPerc(progress) : setImgPerc(progress)
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
              break;
          }
        }, 
        (error) => {
        }, 
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setInput((prev)=>{
              return {...prev, [urlType]:downloadURL}
           })
          });
          }
      )
    }
    const handleSubmit = async(e)=>{
      e.preventDefault()
      try{
        const res = await axios.post('/videos', {...input, tags})
        res.status===200 && navigate(`/videos/${res.data._id}`)
        setOpen(false)
      }
      catch(error)
      {
           console.log(error)
      }
    }
    useEffect(()=>{
      video && UploadFile(video, "videoUrl")
    }
      ,[video])
    useEffect(()=>{
      image && UploadFile(image, "imgUrl")
    }
      ,[image])

  return (
    <Container>
        <Wrapper>
            <Close onClick={()=>setOpen(false)}>X</Close>
            <Title>Upload new Video</Title>
            <Label>Upload video file</Label>
            {
              videoPer>0? ("File Uploading ..."+videoPer+"%") :
               ( <Input type="file" accept="video/*" onChange={e=>setVideo(e.target.files[0])}/>)
            }
           
            <Input type="text" placeholder="Title" name='title'   onChange={handleInput}/>
            <Desc placeholder='Description' name='desc' onChange={handleInput}  rows={8}/>
            <Input type="text" placeholder='Enter hashtags with comma' 
            onChange={e=>setTags(e.target.value.split(","))} value={tags}/>
            <Label>Upload thumbnail image</Label>
            {
              imgPer>0 ? ("File uploading... "+imgPer+"%") 
              : ( <Input type="file" accept="image/*"  onChange={e=>setImage(e.target.files[0])}/>)
            }
           
            <Button onClick={handleSubmit}>Upload</Button>
        </Wrapper>
    </Container>
  )
}

export default Upload