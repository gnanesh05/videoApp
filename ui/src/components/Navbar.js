import React,{useState} from 'react'
import styled from 'styled-components'
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import Upload from './Upload';


const Container = styled.div`
position: sticky;
top: 0;
background-color: ${({theme})=>theme.bgLighter};
height: 56px;

`
const Wrapper = styled.div`
display: flex;
align-items: center;
justify-content: flex-end;
height: 100%;
padding: 0px 20px;
position: relative;

`
const SearchBar = styled.div`
width: 40%;
position: absolute;
left: 0;
right:0;
margin: auto;
display: flex;
align-items: center;
justify-content: space-between;
padding: 5px;
border: 1px solid #ccc;
border-radius: 3px;

`
const Input = styled.input`
border: none;
outline: none;
background-color: transparent;
width: 100%;
`

const Button = styled.button`
padding: 5px 15px;
background-color: transparent;
border: 1px solid #3ea6ff;
color: #3ea6ff;
border-radius: 3px;
font-weight: 500;
margin-top: 10px;
cursor: pointer;
display: flex;
align-items: center;
gap: 5px;
`
const User = styled.div`
display: flex;
align-items: center;
gap: 10px;
font-weight: 500;
color: ${({theme})=>theme.text};

`
const Avatar = styled.img`
width: 32px;
height: 32px;
border-radius: 50%;
background-color: #999;
`
const Navbar = () => {
  const {currentUser} = useSelector(state=>state.user)
  const[open, setOpen] = useState(false)
  return (
    <>
      <Container>
      <Wrapper>
        <SearchBar>
          <Input placeholder="Search"/>
          <SearchIcon/>
        </SearchBar>
        {
          currentUser ? (
            <User>
              <VideoCallIcon onClick={()=>setOpen(true)} />
              <Avatar src={currentUser.image}/>
                {currentUser.name}
            </User>
          ) : ( 
          <Link to='signin' style={{textDecoration: "none"}} >
            <Button>
              <AccountCircleOutlinedIcon/> SIGN IN
            </Button>
           </Link>)
        }
       
      </Wrapper>
      </Container>

      {open && (<Upload setOpen={setOpen}/>)}
    </>
    
  )
}

export default Navbar