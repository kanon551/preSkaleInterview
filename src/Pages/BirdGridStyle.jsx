

import styled from 'styled-components'


export const Container = styled.div`
    height: 100vh;
    position: fixed;
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow-y: auto;
    background-color: #ffffff;
` 

export const BirdsInfo = styled.div`
    display: flex;
    flex-direction: column;
    margin-right: 20px;
`

export const BirdInfoTitle = styled.div`
    display: flex;
    font-size: xx-large;
    font-weight: 700;
    flex-wrap: wrap;
`

export const BirdInfoDescription = styled.div`
    display: flex;
    flex-wrap: wrap;
`
export const CrudButton = styled.button`
    border: none;
    padding: 5px;
    width: 100px;
    height:  ${props => props.color === '#9d9d9d' || props.color === 'red' ? '30px' : '40px'};
    background-color: ${props => props.color}; 
    color: white;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    display: inline-flex;
    margin-right: 20px;

    
    
`

export const DialogButton = styled.div`
    border: none;
    padding: 5px;
    width: 100%;
    height:  40px;
    background: cadetblue; 
    color: white;
    cursor: pointer;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
    display: inline-flex;
`

export const Input = styled.input`
  width: 300px;
  height: 40px;
  min-width: 150px;
  margin-right: 20px;
  background: transparent url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' class='bi bi-search' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'%3E%3C/path%3E%3C/svg%3E") no-repeat 13px;
  background-position-x: 90%;
  background-color: white;
  display: flex;

box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 );
backdrop-filter: blur( 20px );
-webkit-backdrop-filter: blur( 20px );
border-radius: 10px;
border: 1px solid rgba( 255, 255, 255, 0.18 );
    flex-direction: column;

     &:focus-visible{   
          outline: 2px solid #2e7d32;
    }
`

export const DialogInput = styled.input`
  width: 100%;
  border: 1px solid #555;
  display: block;
  height: 50px;
  border: none;
  font-size: medium;
  min-width: 150px;
  border-radius: 5px;
  background-color: white;
  display: flex;
      &:focus-visible{   
          outline: 1px solid #54cfe5;
    }
`
export const Body = styled.div`
    padding: 40px;
    flex-direction: column;
    display: flex;
`

export const Table = styled.div`
    height: 400px;
    width: auto;
    min-width: 150px;
    border-radius: 34px;
    padding: 10px;
    background: #ffffff;
    box-shadow:  8px 8px 20px #9d9c9c,
                -8px -8px 20px #ffffff;
`

export const DialogLabel = styled.label`
  font-size: large;
`

export const DateStyle = styled.div`
     background: white;
    height: 40px;
    width: 100%;
`