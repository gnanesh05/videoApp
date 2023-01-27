import React,{useState} from 'react'
import styled from 'styled-components'


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
    const [desc , setDesc] = useState("")
    const [title, setTitle] = useState("")
    const [tags, setTags] = useState([])

  return (
    <Container>
        <Wrapper>
            <Close onClick={()=>setOpen(false)}>X</Close>
            <Title>Upload new Video</Title>
            <Label>Upload video file</Label>
            <Input type="file" accept="video/*" onChange={e=>setVideo(e.target.files[0])}/>
            <Input type="text" placeholder="Title" defaultValue={title}  onChange={e=>{console.log("typing")
                setTitle(e.target.value)}} />
            <Desc placeholder='Description' value={desc} onChange={e=>setDesc(e.target.value)}  rows={8}/>
            <Input type="text" placeholder='Enter hashtags with comma' 
            onChange={e=>setTags(e.target.value.split(","))} value={tags}/>
            <Label>Upload thumbnail image</Label>
            <Input type="file" accept="image/*"  onChange={e=>setImage(e.target.files[0])}/>
            <Button>Upload</Button>
        </Wrapper>
    </Container>
  )
}

export default Upload