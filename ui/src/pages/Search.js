import axios from 'axios'
import React,{useEffect, useState} from 'react'
import styled from 'styled-components'


const Container = styled.div`
display: flex;
flex-wrap: wrap;
gap: 10px;
`

const Search = () => {
    const[videos, setVideos] = useState([])
    useEffect(()=>{
       const searchVideo = async()=>{
        const res = await axios.get(`/videos/search`)
       }
    },[])
  return (
    <Container>
      
    </Container>
  )
}

export default Search
