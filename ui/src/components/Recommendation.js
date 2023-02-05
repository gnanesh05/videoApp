import React,{useState, useEffect} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import Card from './Card'

const Container = styled.div`
flex: 2;

`
const Recommendation = ({tags}) => {
    console.log(tags)
    const [videos, setVideos] = useState([])

    useEffect(()=>{
        const fetchVideos = async()=>{
            console.log(`videos/tags?tags=${tags}`)
            const res = await axios.get(`videos/tags?tags=${tags}`)
            console.log(res.data)
            setVideos(res.data)
        }

        fetchVideos()
    },[tags])

  return (
    <Container>
        Recommendation
        {videos.map((video)=>(
            <Card id={video._id} video={video}/>
        ))}
    </Container>
  )
}

export default Recommendation