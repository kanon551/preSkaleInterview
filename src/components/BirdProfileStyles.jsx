
import styled from 'styled-components'


export const Container = styled.div`
    user-select: none;
    color: black;
    border-radius: 22px;
    display: flex;
    flex-direction: row;
    height: 200px;
    width: 100%;
    background: white;

    box-shadow:  6px 6px 7px #9d9c9c,
             -6px -6px 7px #ffffff;
    &:hover{
        cursor: pointer;
        transform: scale(1.1);
    }
`

export const BirdImage = styled.div`
display: flex;
flex: 1;
flex-wrap: wrap;

align-items: flex-end;
    justify-content: center;
padding: 10px;

background-image: url(${props => props.img });
    background-repeat:no-repeat;
    background-size: 100% 100%;

    border-top-left-radius: 22px;
    border-bottom-left-radius: 22px;
  width: 100%;
  height: auto;
  position: relative;
  object-fit: cover;
`

export const OnlyBackground = styled.div`
    background-color: ${props => props.stat === "Least Concern" ? '#60dd66' : '#fd4040' };
    padding: 5px;
    border-radius: 10px;

`

export const BirdDescription = styled.div`
display: flex;
flex-direction: column;
flex:1;
padding: 10px;
`

export const NameLabel = styled.div`
    display: flex;
    flex: 1;
    font-weight: 200;
    font-size: x-large;
    border-bottom: 1px solid #c7baad;
    flex-wrap: wrap;

`


export const RealName = styled.div`
    display: flex;
    flex: 1;
    flex-wrap: wrap;

`

export const Name = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`

export const Bottom = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
`


export const Last = styled.div`
display: flex;
    flex: 1;
    font-weight: 200;
    font-size: large;
    flex-wrap: wrap;
    border-bottom: 1px solid #c7baad;
`

export const LocationLabel = styled.div`
display: flex;
    flex: 1;
    flex-wrap: wrap;
`

export const DateLabel = styled.div`
display: flex;
    flex: 1;
    flex-wrap: wrap;
`