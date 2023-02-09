import axios from 'axios'
import React,{useEffect, useState} from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Card from '../components/Card'


const Container = styled.div`
display: flex;
flex-wrap: wrap;
gap: 10px;
`

const Search = () => {
    const[videos, setVideos] = useState([])
    const search = useLocation().search
    useEffect(()=>{
       const searchVideos = async()=>{
        const res = await axios.get(`/videos/search${search}`)
        setVideos(res.data)
       }
      
       searchVideos()
    },[search])
  return (
    <Container>
      {videos.map((video)=>(
        <Card key={video._id} video={video}/>
      ))}
    </Container>
  )
}

export default Search
