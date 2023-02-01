import React,{useState} from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { loginFailure, loginStart, loginSuccess } from '../redux/userSlice'
import {auth, provider} from '../firebase.js'
import { signInWithPopup } from 'firebase/auth'
import {useNavigate } from 'react-router-dom';


const Container = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: calc(100vh - 56px);
color: ${({theme})=>theme.text};
`

const Wrapper = styled.div`
display: flex;
align-items: center;
flex-direction: column;
background-color: ${({theme})=>theme.bgLighter};
border: 1px solid ${({theme})=>theme.soft};
padding: 20px 50px;
gap:10px;
`
const Title = styled.h1`
font-size: 24px;

`
const SubTitle = styled.h2`
font-size: 20px;
font-weight: 300;
`

const Input = styled.input`
border: 1px solid ${({theme})=>theme.soft};
border-radius: 3px;
color: ${({theme})=>theme.text};
padding: 10px;
background-color: transparent;
width: 100%;
`

const Button = styled.button`
border: none;
border-radius: 3px;
padding: 10px 20px;
font-weight: 500;
cursor: pointer;
background-color: ${({theme})=>theme.soft};
color: ${({theme})=>theme.textSoft};
`

const More = styled.div`
display: flex;
font-size: 12px;
margin-left: 10px;
color: ${({theme})=>theme.textSoft};
`

const Links = styled.div`
margin-left: 50px;
`

const Link = styled.span`
margin-left: 30px;
`


const Signin = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate();
  
  const handleSignin = async (e)=>{
    e.preventDefault()
    dispatch(loginStart())

    try 
    {
      console.log(username, password)
      const res = await axios.post('/auth/signin' , {name:username, password})
      dispatch(loginSuccess(res.data))
      console.log(res.data)
      navigate("/")
    } 
    catch (error) {
      dispatch(loginFailure())
    }

  }

  const signinGoogle = async()=>{
    try {
      dispatch(loginStart())
      const response = await signInWithPopup(auth, provider)
      console.log(response)
      const user = await axios.post("/auth/google", {
        name : response.user.displayName,
        email: response.user.email,
        image: response.user.photoURL
      })
      dispatch(loginSuccess(user.data))
    } catch (error) {
      dispatch(loginFailure())
    }
    

  }
  return (
    <Container>
        <Wrapper>
            <Title>Sign in</Title>
            <SubTitle>Sign in to WeTube</SubTitle>
            <Input type="text" placeholder="username" onChange={e=>setUsername(e.target.value)} />
            <Input type="password" placeholder="password" onChange={e=>setPassword(e.target.value)} />
            <Button onClick={handleSignin}>Sign In</Button>
            <Title>Or</Title>
            <Button onClick={signinGoogle}>Sign in with Google</Button>
            <Title>Or</Title>
            <Input type="text" placeholder="username" onChange={e=>setUsername(e.target.value)} />
            <Input type="email"   placeholder="email"  onChange={e=>setEmail(e.target.value)}/>
            <Input type="password" placeholder="password" onChange={e=>setPassword(e.target.value)} />
            <Button onClick={handleSignin}>Sign Up</Button>
            <More>
              English(US)
              <Links>
                <Link>Help</Link>
                <Link>Privacy</Link>
                <Link>Terms</Link>
              </Links>
            </More>
        </Wrapper>
    </Container>
  )
}

export default Signin