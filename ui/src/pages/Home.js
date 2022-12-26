import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import Card from '../components/Card'
import axios from 'axios'

const Container = styled.div`
display: flex;
justify-content: space-around;
flex-wrap: wrap;
`


const Home = ({type}) => {

  const [videos, setVideos] = useState([])

  useEffect(()=>{
    const fetchVideos = async () =>{
      const res = await axios.get(`/videos/${type}`)
      setVideos(res.data)
    }
    fetchVideos()
  },[type])

  
  return (
    <Container>
        {videos.map((video, i)=>(
          <Card key={i} video={video}/>
        ))}
      
    </Container>
  )
}

export default Home