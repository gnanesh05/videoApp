import { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components'
import Menu from './components/Menu';
import Navbar from './components/Navbar';
import { darkTheme, lightTheme } from './utils/Theme';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home.js';
import Video from './pages/Video.js';
import Signin from './pages/Signin';
import Search from './pages/Search';

const Container = styled.div`
 display: flex;
`
const Main = styled.div`
flex: 7;
background-color: ${({theme})=>theme.bg};

`

const Wrapper = styled.div`
 padding: 22px 96px;
`

function App() {
  const [darkMode, setDarkMode] = useState(true)
  return (
    <ThemeProvider theme={darkMode? darkTheme : lightTheme }>
      <Container>
        <Router>
          <Menu darkMode={darkMode} setDarkMode={setDarkMode}/>
          <Main>
            <Navbar/>
            <Wrapper>
              <Routes>
                Video Cards
                <Route path="/">
                  <Route index element={<Home type="random"/>}/>
                  <Route path='trends' element={<Home type="trend"/>}/>
                  <Route path='subscriptions' element={<Home type="sub"/>}/>
                  <Route path='search' element={<Search/>}/>
                  <Route path='signin' element={<Signin/>}/>
                  <Route path="video">
                    <Route path=':id' element={<Video/>} />
                  </Route>
                </Route>
              </Routes>
              
            </Wrapper>
          </Main>
        </Router>
        
     </Container>
    </ThemeProvider>
    
  );
}

export default App;
