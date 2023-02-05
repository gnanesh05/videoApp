import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Comments from '../components/Comments.js';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation,useNavigate } from 'react-router-dom';
import  axios from 'axios';
//import {format} from 'timeago.js'
import { dislike, fetchFailure, fetchStart, fetchSuccess, like } from '../redux/videoSlice.js';
import { subscription, logout } from '../redux/userSlice.js';
import Recommendation from '../components/Recommendation.js';

const Container = styled.div`
display: flex;
gap: 24px;
`
const Content = styled.div`
flex:5;

`


const VideoWrapper = styled.div`
`
const Title = styled.h1`
font-size: 18px;
font-weight: 400;
margin-top: 20px;
margin-bottom: 10px;
color: ${({theme})=>theme.text};`

const Details = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
`
const Info = styled.span`
color: ${({theme})=>theme.textSoft};
`
const Buttons = styled.div`
display: flex;
gap:20px;
color: ${({theme})=>theme.text};
`
const Button = styled.div`
display: flex;
gap: 5px;
align-items: center;
cursor: pointer;
`
const Hr = styled.hr`
margin: 15px 0px;
border: 0.5px solid ${({theme})=>theme.soft};
`

const Channel = styled.div`
display: flex;
justify-content: space-between;
`
const ChannelInfo = styled.div`
display: flex;
gap: 20px;
`

const Subscribe = styled.button`
background-color: #cc1a00;
font-weight: 500;
color: white;
border: none;
border-radius: 3px;
height: max-content;
padding: 10px 20px;
cursor: pointer;
`

const Image = styled.img`
width: 50px;
height: 50px;
border-radius: 50%;
`

const ChannelDetail = styled.div`
display: flex;
flex-direction: column;
color: ${({theme})=>theme.text};

`
const ChannelName = styled.span`
font-weight: 500;
`
const ChannelCounter = styled.span`
margin-top: 5px;
margin-bottom: 20px;
color: ${({theme})=>theme.textSoft};
font-size: 12px;
`
const Description = styled.p`
font-size: 14px;
`
const VideoFrame = styled.video`
max-height: 720px;
width: 100%;
object-fit: cover;
`
const Video = () => {
  const {currentUser} = useSelector((state)=>state.user)
  const {currentVideo} = useSelector((state)=>state.video)
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const path = useLocation().pathname.split('/')[2]
  const [channel, setChannel] = useState({})

  const handleLike = async()=>{
    try {
      console.log(currentVideo._id)
      await axios.put(`/users/like/${currentVideo._id}`)
      dispatch(like(currentUser._id))
    } catch (error) {
      console.log(error)
    }
  }
  const handleDislike = async()=>{
    try {
      await axios.put(`/users/dislike/${currentVideo._id}`)
      dispatch(dislike(currentUser._id))
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubscribe = async()=>{
    try {
      currentUser.subscribedUsers.includes(channel._id) ? await axios.put(`/users/sub/${channel._id}`) 
      : await axios.put(`/users/unsub/${channel._id}`)
      dispatch(subscription(currentUser._id))
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    const fetchData = async()=>{
      try{
        console.log("starting")
        dispatch(fetchStart())
        const videoRes = await axios.get(`/videos/find/${path}`)
        const channelRes = await axios.get(`/users/find/${videoRes.data.userId}`)
        setChannel(channelRes.data )
        dispatch(fetchSuccess(videoRes.data))
       // dispatch(logout())
      }
      catch(error){
          console.error(error)
          if(error.status===404)
            {
              dispatch(logout())
              navigate("/signin")
            }
         dispatch(fetchFailure())
      }
     
    }
 
    if(!currentUser)
       navigate("/signin")

    fetchData()
  },[path, dispatch, navigate, currentUser])
 
  return (
    <Container>
      <Content>
        <VideoWrapper>
          <VideoFrame src={currentVideo.videoUrl} controls/>
        </VideoWrapper>
          <Title>{currentVideo.title}</Title>
          <Details>
            <Info>{currentVideo.views} views. {currentVideo.createdAt}</Info>
            <Buttons>
                <Button onClick={handleLike}>
                  {currentVideo.likes?.includes(currentUser._id) ? <ThumbUpAltIcon/>  : <ThumbUpOffAltIcon/>}
                   {currentVideo.likes?.length}K
                </Button>
                <Button onClick={handleDislike}> 
                  {currentVideo.dislikes?.includes(currentUser._id) ? <ThumbDownIcon/> : <ThumbDownOffAltIcon/> }
                   DisLike 
                </Button>
                <Button> <ShareIcon/> Share </Button>
                <Button> <BookmarkIcon/> Save </Button>
            </Buttons>
          </Details>
          <Hr/>
          <Channel>
            <ChannelInfo>
              <Image src={channel.img}/>
              <ChannelDetail>
                <ChannelName>{channel.name}</ChannelName>
                <ChannelCounter>{channel.subscribers} Subscribers</ChannelCounter>
                <Description>
                    {currentVideo.description}
                </Description>

              </ChannelDetail>
            </ChannelInfo>
            <Subscribe onClick={handleSubscribe}>
              {currentUser.subscribedUsers?.includes(currentUser._id)? "SUBSCRIBED" :"SUBSCRIBE" }
            </Subscribe>
          </Channel>
          <Hr/>
          <Comments videoId={currentVideo._id}/>
       
      </Content>
      <Recommendation tags={currentVideo.tags}/>
    </Container>
  )
}

export default Video