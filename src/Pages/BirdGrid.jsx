import React, { useState } from 'react'
import Header from '../components/Header'
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar} from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import '../Pages/BirdGrid.css';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {Library} from '../components/BirdLibrary';
import {Container, BirdsInfo, BirdInfoTitle, BirdInfoDescription, CrudButton, 
  DialogButton,Input, DialogInput, Body, Table, DialogLabel} from '../Pages/BirdGridStyle';
  import {useNavigate} from 'react-router-dom';

  const BirdGrid = () => {

    const navigate = useNavigate();
    const [rows, setRows] = useState(Library);
    const [openDialog, setOpenDialog] = useState(false);
    // const [open, setOpen] = useState(false);
    const [birdID, setBirdID] = useState('');

    /***********Date *************************/
    const [value, setValue] = useState((new Date().getMonth()+1)+"/"+new Date().getDate()+"/"+new Date().getFullYear());
    const handleChange = (newValue) => {
      setValue(newValue);
    };
    /***********Date *************************/

    const [status, setStatus] = useState(0);
    const [family, setFamily] = useState(0);
    const [commonName, setCommonName] = useState('');
    const [scientificName, setscientificName] = useState('');
    const [spotLocation, setspotLocation] = useState('');
    
    const { loading } = useDemoData({ });

    const checkBirdLibrary = (e)=>{
      if(e.keyCode === 8){
          //console.log("backward filtering")
          const noBackCharecter = e.target.value.slice(0, -1)
          const p = Array.from(noBackCharecter).reduce((a, v, i) => `${a}[^${noBackCharecter.substr(i)}]*?${v}`, '');
          const re = RegExp(p);
          setRows(Library.filter(v => v.commonName.toLowerCase().match(re)))
      }
      else if(e.target.value !== ""){
          //console.log("forward filtering")
          //setPageNumber(0)
          const p = Array.from(e.target.value).reduce((a, v, i) => `${a}[^${e.target.value.substr(i)}]*?${v}`, '');
          const re = RegExp(p);
          setRows((prev)=>
      [...prev].filter(v => v.commonName.toLowerCase().match(re)))
      }
      else{
        setRows(Library)
      }
      
    }


  const columns= [
  { field: 'commonName', headerName: 'Name', width: 230 },
  { field: 'spotLocation', headerName: 'Spotted Location', width: 230 },
  { field: 'spotDate', headerName: 'Last Spotted Date', width: 230 },
  { field: 'status', headerName: 'Conservation Status', width: 230,
  renderCell: (cellValues) => {
    if(cellValues.value === "Critically Endangered"){
        return (
            <div
              style={{
                fontSize: 18,
                width: "100%",
                height: '30px',
                background: '#fd4040',
                color: 'white',
                borderRadius:'10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {cellValues.value}
            </div>
          );
    }
    else{
        return (
            <div
            style={{
                fontSize: 18,
                width: "100%",
                height: '30px',
                background: '#60dd66',
                color: 'white',
                borderRadius:'10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              >
              {cellValues.value}
            </div>
          );
    }
      
    } },
  { field: 'scientific', headerName: 'Scientific Name', width: 230},
  { field: 'actions', 
      type: 'actions', 
      width: 250,
      getActions: (event) => [
        <CrudButton onClick={()=>handleClickOpen(event)} color={"#9d9d9d"}  label="Edit">Edit</CrudButton>,
        <CrudButton onClick={()=> deleteUser(event)} color={"red"} label="Delete">Delete</CrudButton>
      ], 
    },
];
// const handleClose = (event, reason) => {
//     if (reason === 'clickaway') {
//       return;
//     }

//     setOpen(false);
//   };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

const handleClickOpen = (event) => {
    if(event.row === undefined){
        setBirdID('');
        setCommonName('')
        setscientificName('')
        setspotLocation('')
        setValue((new Date().getMonth()+1)+"/"+new Date().getDate()+"/"+new Date().getFullYear())
        setStatus(0)
        setFamily(0)
        setOpenDialog(true);
    }
    else{
        setBirdID(event.row.id)
        setCommonName(event.row.commonName)
        setscientificName(event.row.scientific)
        setspotLocation(event.row.spotLocation)
        setValue(event.row.spotDate)
        setStatus(event.row.status)
        setFamily(event.row.family)
        setOpenDialog(true);
    }

    setOpenDialog(true);
  };

  const deleteUser = (event) => {
        //   authAxios.delete(`/sampleUsers/${event.id}`)
        //   .then( res => { 
        //     setMessage(res.data.response)
        //     setOpen(true); 
        //     getUsers(); 
        //   }) 
        // .catch(e => {

        // })
  }

  return (
    <Container>
      <Header/>
      <Body>
            <Box
                sx={{ display: 'flex',flexDirection:'row', p: 1,  borderRadius: 1, 
                    alignItems:'center', justifyContent:'space-between',borderBottom: '1px solid #c7baad' }}
            >
                <BirdsInfo >
                    <BirdInfoTitle>
                        Manage Birds
                    </BirdInfoTitle>
                    <BirdInfoDescription>
                        Manage all species of birds and their information
                    </BirdInfoDescription>
                </BirdsInfo>
                <CrudButton onClick={handleClickOpen} color={"#2e7d32"}>+ Add</CrudButton>
            </Box>
            <Box
                sx={{ display: 'flex',flexDirection:'row', p: 1,  borderRadius: 1,
                alignItems:'center', justifyContent:'space-between', marginTop:'20px', marginBottom:'20px',
                //background: 'rgba(0, 0, 0, 0.04)'
            }}
            >
                    <Input placeholder="Search by name..."  
                            onChange={(e)=> checkBirdLibrary(e)}
                            onKeyDown={(e)=> checkBirdLibrary(e)}>
                    </Input>
                    <CrudButton onClick={()=>navigate('/birdGallery')} color={"#2e7d72"}>Gallery</CrudButton>
            </Box>

            <Table>
                <DataGrid style={{color:'black', backgroundColor:'white', width:'auto'}}
                rows={rows}
                columns={columns}
                /* getRowId={(row) => row._id} */
                loading={loading} 
                components={{ Toolbar: GridToolbar }} />
             </Table>

                <Dialog
                    open={openDialog}
                    onClose={handleCloseDialog}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    
                >

                    <DialogTitle id="alert-dialog-title" style={{backgroundColor: '#eaeaec'}}>
                        {
                          birdID === '' ? "Add" : "Edit"
                        }
                    </DialogTitle>
                    <DialogContent style={{padding: "16px 24px",backgroundColor: '#eaeaec' }}>
                        <DialogContentText id="alert-dialog-description" style={{padding: '10px'}}>
                        <Grid container spacing={2}>
                            <Grid item  xs={12} sm={12} md={6} lg={6} xl={6}>
                                <DialogLabel>Common name</DialogLabel>
                                <DialogInput value={commonName} onChange={(e)=> setCommonName(e.target.value)}></DialogInput>
                            </Grid>
                            <Grid item  xs={12} sm={12} md={6} lg={6} xl={6}>
                                <DialogLabel>Scientific Name</DialogLabel>
                                <DialogInput value={scientificName} onChange={(e)=> setscientificName(e.target.value)}></DialogInput>
                            </Grid>
                            <Grid item  xs={12} sm={12} md={6} lg={6} xl={6}>
                                <DialogLabel>Spotted Date(MM/dd/yyyy)</DialogLabel>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                  <DesktopDatePicker
                                    // label="Date desktop"
                                    inputFormat="MM/dd/yyyy"
                                    value={value}
                                    onChange={handleChange}
                                    renderInput={(params) => <TextField {...params} />}
                                  />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item  xs={12} sm={12} md={6} lg={6} xl={6}>
                                <DialogLabel>Spotted Location</DialogLabel>
                                <DialogInput value={spotLocation} onChange={(e)=> setspotLocation(e.target.value)}></DialogInput>
                            </Grid>
                            <Grid item  xs={12} sm={12} md={6} lg={6} xl={6}>
                                <FormControl fullWidth>
                                    <DialogLabel id="demo-simple-select-label">Status</DialogLabel>
                                    <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      value={status}
                                      label="Age"
                                      onChange={(e)=> setStatus(e.target.value)}
                                    >
                                      <MenuItem value={0}>None</MenuItem>
                                      <MenuItem value={'Least Concern'}>Least Concern</MenuItem>
                                      <MenuItem value={'Critically Endangered'}>Critically Endangered</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item  xs={12} sm={12} md={6} lg={6} xl={6}>
                                <FormControl fullWidth>
                                    <DialogLabel id="demo-simple-select-label">Family</DialogLabel>
                                    <Select
                                      labelId="demo-simple-select-label"
                                      id="demo-simple-select"
                                      value={family}
                                      label="Age"
                                      onChange={(e)=> setFamily(e.target.value)}
                                    >
                                      <MenuItem value={0}>None</MenuItem>
                                      <MenuItem value={'Rheas'}>Rheas</MenuItem>
                                      <MenuItem value={'Megapodes'}>Megapodes</MenuItem>
                                      <MenuItem value={'Oilbird'}>Oilbird</MenuItem>
                                      <MenuItem value={'Potoos'}>Potoos</MenuItem>
                                      <MenuItem value={'Bustards'}>Bustards</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions style={{padding: '16px 24px',backgroundColor: '#eaeaec'}}>
                       
                        <DialogButton autoFocus >
                          {
                            birdID === '' ? "Save" : "Update"
                          }
                        </DialogButton>
                    </DialogActions>

                </Dialog>
      </Body>
      
    </Container>
  )
}

export default BirdGrid
