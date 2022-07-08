import React from 'react'
import Header from '../components/Header'
import {Library} from '../components/BirdLibrary';
import BirdProfile from '../components/BirdProfile';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import {Container,Body,BirdsInfo} from '../Pages/BirdGalleryStyles'

const BirdGallery = () => {

  return (
    <Container>
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
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} 
            style={{ marginTop: '20px'}}>
                    {
                        Library.map((obj)=> (
                            <Grid item xs={12} sm={12} md={4} lg={4} xl={4} key={obj.id}>
                                <BirdProfile obj={obj} />
                            </Grid>
                        ))
                        
                    }
            </Grid>
      </Body>
    </Container>
  )
}

export default BirdGallery
