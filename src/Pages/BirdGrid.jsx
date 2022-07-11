import React, { useState,useRef,useEffect } from 'react'
import Header from '../components/Header'
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar,GridActionsCellItem} from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
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
import {Container, BirdsInfo, BirdInfoTitle, BirdInfoDescription, CrudButton, 
  DialogButton,Input, DialogInput, Body, Table, DialogLabel} from '../Pages/BirdGridStyle';
  import {useNavigate} from 'react-router-dom';
  import { useCallback } from 'react';
  import axios from 'axios';
  import Snackbar from '@mui/material/Snackbar';
  import Button from '@mui/material/Button';
import AddCardIcon from '@mui/icons-material/AddCard';
import CollectionsIcon from '@mui/icons-material/Collections';
import Fade from '@mui/material/Fade';
import CircularProgress from '@mui/material/CircularProgress';
import Tooltip from '@mui/material/Tooltip';


  const BirdGrid = () => {

    const navigate = useNavigate();
    const fileInput = useRef(null)


    const [birds, setBirds] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const vertical = "top";
    const horizontal = "right";
    const[message,setMessage] = useState('');
    const [open, setOpen] = useState(false);
    const [birdID, setBirdID] = useState('');

    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [copyBirds, setCopyBirds] = useState([])
    const [progress, setProgress] = useState(true);

    /***********Date *************************/
    
    const [value, setValue] = useState(new Date());
    const handleChange = (newValue) => {
      setValue(newValue);
    };
    /***********Date *************************/

    const [status, setStatus] = useState(0);
    const [family, setFamily] = useState(0);
    const [commonName, setCommonName] = useState('');
    const [scientificName, setscientificName] = useState('');
    const [spotLocation, setspotLocation] = useState('');
    const [file, setFile] = useState(null);
    
    const { loading } = useDemoData({ });

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

    const convertBackendDateToFront = (value) => {
      var date = new Date(value.replace('IST', ''));
      let day = date.getDate();
      let month = date.getMonth()+1;
      let year = date.getFullYear();
      const changeddate = month+"/"+day+"/"+year
      return changeddate;
    }


    const getBirds = async() => {
       await axios.get(`https://birdslibrary.herokuapp.com/api/preSkale/getBirds`)
                        .then(res => {
                          setProgress(false);
                          setCopyBirds(getRowsWithID(res.data['object']))
                          setBirds(getRowsWithID(res.data['object'])) 
                        });
     
    }

    const checkBirdLibrary = (e)=>{
      if(e.keyCode === 8){
          //console.log("backward filtering")
          const noBackCharecter = e.target.value.slice(0, -1)
          let caseInsensitive = noBackCharecter.toLowerCase();
          const p = Array.from(caseInsensitive).reduce((a, v, i) => `${a}[^${caseInsensitive.substr(i)}]*?${v}`, '');
          const re = RegExp(p);
          setBirds(copyBirds.filter(v => v.commonName.toLowerCase().match(re)))
      }
      else if(e.target.value !== ""){
          //console.log("forward filtering")
          let caseInsensitive = e.target.value.toLowerCase();
          const p = Array.from(caseInsensitive).reduce((a, v, i) => `${a}[^${caseInsensitive.substr(i)}]*?${v}`, '');
          const re = RegExp(p);
          setBirds((prev)=>
      [...prev].filter(v => v.commonName.toLowerCase().match(re)))
      }
      else{
        setBirds(copyBirds)
      }
      
    }


  const columns= [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'commonName', headerName: 'Name', width: 200 },
  { field: 'spottedLocation', headerName: 'Spotted Location', width: 200 },
  { field: 'spottedDate', headerName: 'Last Spotted Date', width: 200,
    valueGetter: (params) => {
      return convertBackendDateToFront(params.value)
    }
  },
  { field: 'status', headerName: 'Conservation Status', width: 200,
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
      
    } 
  },
  { field: 'scientificName', headerName: 'Scientific Name', width: 200},
  { field: 'actions', 
      type: 'actions', 
      width: 250,
      getActions: (event) => [
        <CrudButton onClick={()=>handleClickOpen(event)} color={"#9d9d9d"}  label="Edit">Edit</CrudButton>,
         <CrudButton onClick={()=> deleteUser(event)} color={"red"} label="Delete">Delete</CrudButton>
      ], 
    },
];
const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

const handleClickOpen = (event) => {
    if(event.row === undefined){
        setBirdID('');
        setCommonName('')
        setscientificName('')
        setspotLocation('')
        setStatus(0)
        setFamily(0)
        setValue(new Date())
        setOpenDialog(true);
    }
    else{
        setBirdID(event.row._id)
        setCommonName(event.row.commonName)
        setscientificName(event.row.scientificName)
        setspotLocation(event.row.spottedLocation)
        let convertToStringDate = convertBackendDateToFront(event.row.spottedDate)
        let stringDateToObject = new Date(convertToStringDate)
        setValue(stringDateToObject)
        setStatus(event.row.status)
        setFamily(event.row.family)
        setOpenDialog(true);
    }
  };

  const deleteUser = (event) => {
    setBirdID(event.row._id)
    setDeleteConfirm(true)
        
  }

  const deleteConfirmed = async()=> {
      await axios.delete(`https://birdslibrary.herokuapp.com/api/preSkale/deleteBird/${birdID}`)
      .then( res => { 
        setMessage(res.data['message']);
        setOpen(true); 
        setProgress(true);
        setDeleteConfirm(false)
        getBirds();
      }) 
    .catch(e => {

    })
  }

  const imageUpload = useCallback((e)=> {
    const file = Math.round((e.target.files[0].size / 1024));
                // The size of the file.
                if (file >= 250) {
                  setMessage("File too Big, please select a file under 220kb")
                  setOpen(true); 
                  setFile(null);
                  fileInput.current.value = null;
                }  else {
                  setFile(e.target.files[0])
                }
      
   })

   const save = async()=> {

    if(commonName === ""){
      setMessage("Enter Bird Name")
      setOpen(true); 
    }
    else if(status === 0){
            setMessage("Please select Status")
            setOpen(true); 
    }
    else{
            let formData = new FormData();
            formData.append('commonName', commonName); 
            formData.append('scientificName', scientificName); 
            formData.append('spottedDate', value); 
            formData.append('spottedLocation', spotLocation); 
            formData.append('status', status.toString()); 
            formData.append('family', family.toString()); 
            formData.append('file', file);

            /**************JSON****** */
            // const data = {
            //   commonName: commonName,
            //   scientificName: scientificName,
            //   spottedDate: value,
            //   spottedLocation: spotLocation,
            //   status: status.toString(),
            //   family: family.toString(),
            //   image: file
            // }
            /**************JSON****** */

           
            try{

              if(birdID === ""){
                await axios.post(`https://birdslibrary.herokuapp.com/api/preSkale/saveBird`,formData)
                .then(response => {
                  setMessage(response.data['message']);
                  setOpen(true); 
                  setProgress(true);
                  setStatus(0);
                  setFamily(0);
                  setCommonName('');
                  setscientificName('');
                  setspotLocation('');
                  setFile(null);
                  setValue(new Date());
                  fileInput.current.value = null;
                  setOpenDialog(false);
                  getBirds();
                })
                .catch(e=> {

                })
              }
              else if(birdID !== ""){
                formData.append('id', birdID); 
                await axios.put(`https://birdslibrary.herokuapp.com/api/preSkale/updateBird`,formData)
                .then(response => {
                  setMessage(response.data['message']);
                  setOpen(true); 
                  setProgress(true);
                  setStatus(0);
                  setFamily(0);
                  setCommonName('');
                  setscientificName('');
                  setspotLocation('');
                  setFile(null);
                  setValue(new Date());
                  fileInput.current.value = null;
                  setOpenDialog(false);
                  getBirds();
                })
                .catch(e=> {

                })
              }
                   

                    
          }
        
          catch(e){
              console.log(e)
          }
    }
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
                <Tooltip title="Add Bird" arrow>
                    <GridActionsCellItem  onClick={handleClickOpen} icon={<AddCardIcon sx={{color:"#2e7d32", fontSize:40}}/>}  label="Add"/>
                </Tooltip>
                
            </Box>
            <Box
                sx={{ display: 'flex',flexDirection:'row', p: 1,  borderRadius: 1,
                alignItems:'center', justifyContent:'space-between', marginTop:'20px', marginBottom:'20px',
            }}
            >
                    <Input placeholder="Search by name..."  
                            onChange={(e)=> checkBirdLibrary(e)}
                            onKeyDown={(e)=> checkBirdLibrary(e)}>
                    </Input>
                    
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

                    <Tooltip title="Gallery" arrow>
                      <GridActionsCellItem  onClick={()=>navigate('/birdGallery')} icon={<CollectionsIcon sx={{color:"#2e7d32", fontSize:40}}/>}  label="Gallery"/>
                    </Tooltip>
                    
            </Box>

            <Table>
                <DataGrid style={{color:'black', backgroundColor:'white', width:'auto',borderRadius: '34px'}}
                rows={birds}
                columns={columns}
                getRowId={(row) => row._id}
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
                                <LocalizationProvider dateAdapter={AdapterDateFns} >
                                  <DesktopDatePicker
                                    inputFormat="MM/dd/yyyy"
                                    value={value}
                                    style={{height:'40px'}}
                                    onChange={handleChange}
                                    renderInput={
                                      (params) => <TextField style={{background: 'white'}}  {...params}/>
                                    }
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
                                      style={{background:'white', height:'50px'}}
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
                                      style={{background:'white', height:'50px'}}
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
                            <Grid item  xs={12} sm={12} md={6} lg={6} xl={6}>
                                <DialogLabel>Bird Image</DialogLabel>
                                <input type={"file"} 
                                style={{border: "none"}} 
                                accept={"image/*"} 
                                multiple={false} 
                                ref={fileInput}
                                onChange={(e) => imageUpload(e)} />
                            </Grid>
                        </Grid>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions style={{padding: '16px 24px',backgroundColor: '#eaeaec' }}>
                        <DialogButton autoFocus onClick={save}>
                          {
                            birdID === '' ? "Save" : "Update"
                          }
                        </DialogButton>
                    </DialogActions>

                </Dialog>
      </Body>

      <Dialog
        open={deleteConfirm}
        onClose={()=> setDeleteConfirm(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
                Delete Record
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
                  Are You sure about deleting this record ?
                  Because once deleted cant be retrived.
                  Confirm Delete
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={deleteConfirmed} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>


      <Snackbar
       anchorOrigin={{ vertical, horizontal }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
        key={vertical + horizontal}
      />
    </Container>
  )
}

export default BirdGrid
