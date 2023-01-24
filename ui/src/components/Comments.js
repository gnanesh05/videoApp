import React,{useState, useEffect} from 'react'
import styled from 'styled-components'
import Comment from './Comment.js'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

const Container = styled.div``
const NewComment = styled.div`
display: flex;
align-items: center;
gap:10px;
`
const Avatar = styled.img`
width: 50px;
height: 50px;
border-radius: 50%;
`
const Input = styled.input`
border: none;
border-bottom: 1px solid ${({theme})=>theme.soft};
background-color: transparent;
outline: none;
padding: 5px;
color: ${({theme})=>theme.text};
width: 100%;
`

const Comments = ({videoId}) => {
  const [comments, setComments] =  useState([])
  const {currentUser} = useSelector((state)=>state.user)
  const dispatch = useDispatch()
  useEffect(() => {
     const fetchComments = async()=>{
      try{
          const res = await axios.get(`/comments/${videoId}`)
          setComments(res.data)
      }
      catch(error){
       console.log(error)
      }
     }
  }, [videoId])
  return (
    <Container>
        <NewComment>
            <Avatar src={currentUser.img}/>
            <Input placeholder="add a comment"/>
        </NewComment>
       
        {
          comments.map((comment)=>(<Comment key={comment._id} commet={comment}/>))
        }
        
    </Container>
  )
}

export default Comments