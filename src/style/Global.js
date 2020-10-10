import { createGlobalStyle } from 'styled-components';


const Global = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,600;1,400&display=swap');
    
    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        font-family: 'Rubik', sans-serif;
    }
    body, html{
        width: 100vh;
        height: 100vh;
    }
    #root {
        width: 100vh;
    }
`
export default Global;