import styled from 'styled-components'

export const Container = styled.div`
    height: 100vh;
    position: fixed;
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow-y: auto;
    background-color: #edebe9;
` 

 export const Body = styled.div`
    padding: 50px;
    flex-direction: column;
    display: flex;
    height: fit-content;
`

export const BirdsInfo = styled.div`
      display: flex;
    font-size: xx-large;
    font-weight: 700;
    flex-wrap: wrap;

`