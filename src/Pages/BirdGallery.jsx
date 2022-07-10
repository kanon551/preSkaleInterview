import React, { useState,useEffect } from 'react'
import Header from '../components/Header'
import BirdProfile from '../components/BirdProfile';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import {GalleryContainer,Body,BirdsInfo} from '../Pages/BirdGalleryStyles'
import axios from 'axios';
import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress';


const BirdGallery = () => {

  const [progress, setProgress] = useState(true);
  const [birds, setBirds] = useState([]);

  useEffect(()=>{
    getBirds();
  },[])

  const getRowsWithID = (rows) => {
    let id = 0;
    let CompleteRowListArray = []

    for(let row of rows){
      const rowWithID = {
        id: id,
        ...row
      }
      id++
      CompleteRowListArray.push(rowWithID)
    }

    return CompleteRowListArray
  }

 


  const getBirds = async() => {
    await axios.get(`https://birdslibrary.herokuapp.com/api/preSkale/getBirds`)
                .then(res => {
                  setProgress(false);
                  setBirds(getRowsWithID(res.data['object']));
                })  ;
    
  }

  return (
    <GalleryContainer>
      <Header/>
      <Body>
            <Box
                sx={{ display: 'flex',flexDirection:'row', p: 1,  borderRadius: 1, 
                    alignItems:'center', justifyContent:'space-between',borderBottom: '1px solid #c7baad', }}
            >
                <BirdsInfo >
                   Gallery
                </BirdsInfo>
            </Box>
            
            <Box sx={{ height: 40 }}>
                      <Fade
                        in={progress}
                        style={{
                          transitionDelay: progress ? '800ms' : '0ms',
                        }}
                        unmountOnExit
                      >
                        <CircularProgress />
                      </Fade>
            </Box>



            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} 
            style={{ marginTop: '20px'}}>
                    {
                        birds.map((obj)=> (
                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} key={obj._id}>
                                <BirdProfile obj={obj} />
                            </Grid>
                        ))
                        
                    }
            </Grid>
      </Body>
    </GalleryContainer>
  )
}

export default BirdGallery
