import {useState} from 'react'
import './uploader.css'
import {MdCloudUpload} from 'react-icons/md'
import * as XLSX from 'xlsx'
import { Box, Button, Modal, Typography } from '@mui/material'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflow: 'auto'
};

const Uploader = () => {
  const [data, setData]=useState([]);  
  const [fileName, SetFileName]=useState("No selected file")
  const [open, setOpen] = useState(false);
  const handleFileUpload=(e)=>{
   
    const reader=new FileReader();
    reader.readAsBinaryString(e.target.files[0]);
    reader.onload=(e)=>{
      const data=e.target.result;
      const workbook=XLSX.read(data, {type:"binary"});
      const sheetName=workbook.SheetNames[0]
      const sheet=workbook.Sheets[sheetName];
      const parsedData=XLSX.utils.sheet_to_json(sheet);
      setData(parsedData)
    }
    if(e.target.files){
      SetFileName(e.target.files[0].name);
    handleOpen();        
    }     
  }
  const handleSubmit=()=>{
    handleClose()
    toast.success('successfully uploaded', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
    
  }
  const handleCancel=()=>{
    handleClose()
    toast.error('File upload Discarded', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  }
  const handleOpen = () => {
  setOpen(true) 
  }
  const handleClose = () => setOpen(false);
  return (
    <main> 
      <ToastContainer
position="top-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
/>
{/* Same as */}
<ToastContainer />     
      <form onClick={()=>document.querySelector(".input-field").click()}>
        <input type='file' className='input-field' accept=".csv, .xlsx, .xls" hidden onChange={(e)=>handleFileUpload(e)}/>
        <MdCloudUpload color='1475cf' size={60} />

        <h2 style={{color: 'rgb(8, 174, 245)'}}>Browse Files to Upload</h2>
        <p>Supports .csv, .xlsx, .xls formats</p>
      </form>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Confirm Upload <b>{fileName}</b>
          </Typography>
          <div className='scrolle'>
          {data.length>0 && (
            <table className='table'>
              <thead>
              <tr>
                {Object.keys(data[0]).map((key)=>(
                  <th key={key}>{key}</th>
                  ))}
              </tr></thead>
              <tbody>
                  {
                    data.map((row, index)=>(
                      <tr key={index}>
                        {
                          Object.values(row).map((value, index)=>(
                            <td key={index}>{value}</td>
                          ))}
                      </tr>
                    ))
                  }
              </tbody>
            </table>
          )}
          </div>
          
          <Button onClick={handleSubmit}>Submit</Button>
          <Button onClick={handleCancel}>Close</Button>
        </Box>
      </Modal>
    </main>
  )
}



export default Uploader