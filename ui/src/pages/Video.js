import React from 'react'
import styled from 'styled-components'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ShareIcon from '@mui/icons-material/Share';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import Comments from '../components/Comments.js';
import Card from '../components/Card.js'

const Container = styled.div`
display: flex;
gap: 24px;
`
const Content = styled.div`
flex:5;

`
const Recommendations = styled.div`
flex: 2;

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

const Video = () => {
  return (
    <Container>
      <Content>
        <VideoWrapper>
          <Title>Test Video</Title>
          <Details>
            <Info>7,984,567 views. June 5 2022</Info>
            <Buttons>
                <Button> <ThumbUpAltIcon/> 123K</Button>
                <Button> <ThumbDownIcon/> DisLike </Button>
                <Button> <ShareIcon/> Share </Button>
                <Button> <BookmarkIcon/> Save </Button>
            </Buttons>
          </Details>
          <Hr/>
          <Channel>
            <ChannelInfo>
              <Image src="https://www.tailorbrands.com/wp-content/uploads/2021/06/Marshal-Kiganjo.jpg"/>
              <ChannelDetail>
                <ChannelName>Gnanesh</ChannelName>
                <ChannelCounter>565K Subscribers</ChannelCounter>
                <Description>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, consequuntur possimus natus vero enim magnam,
                   vel inventore impedit optio minus cupiditate ullam atque recusandae aliquam, voluptas vitae ipsa sapiente excepturi.
                </Description>

              </ChannelDetail>
            </ChannelInfo>
            <Subscribe>Subscribe</Subscribe>
          </Channel>
          <Hr/>
          <Comments/>
        </VideoWrapper>
      </Content>
      <Recommendations>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
        <Card type="sm"/>
      </Recommendations>

    </Container>
  )
}

export default Video