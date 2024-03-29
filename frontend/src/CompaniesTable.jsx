import React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { getToken } from './getToken';
import MaterialTable from 'material-table'
import { ThemeProvider, createTheme } from '@mui/material';
import SearchIcon from '@material-ui/icons/Search';
import ClearIcon from '@material-ui/icons/Clear';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import LastPageIcon from '@mui/icons-material/LastPage';
export default function CompaniesTable() {
const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
const token = getToken();
const defaultMaterialTheme = createTheme({
    root:{
        backgroundColor:'red'
    }
   
  })
  const [page, setPage] = React.useState(6);
  const [pageSize, setPageSize] = React.useState(10);
  const [companies, setCompanies] = React.useState([]);
  const [totalCompanies, setTotalCompanies] = React.useState(0);
 const [loading, setLoading] = React.useState(false);
const columns = [
    {
      title:'Name', field:"name"
    },
    {
      title:'Email', field:'email'
    },
    {
      title:'EMBS', field:'embs'
    },
    {
      title:'EDB', field:'edb'
    },
    {
      title:'Activity', field:'activity'
    },
    {
      title:'Legal Form', field:'legal_form'
    },
    {
      title:'Size', field:'size'
    },
    {
      title:'Active', field:'active'
    },
    {
      title:'Address', field:'address'
    },
    {
      title:'Bank', field:'bank'
    },
    {
      title:'Bank Account Number', field:'bank_account_number'
    },
  ]
 

 React.useEffect(() => {
    if(isLoggedIn)
    {
        setLoading(true);
        const query = `?limit=${pageSize}&page=${page}`;
        axios({
            method:'GET',
            url:`${process.env.REACT_APP_BASE_URL}/companies` + query,
            headers:{
                'Authorization':`Bearer ${token}`
            }
        }).then(response => {
            console.log("response 2", response)
            // setColumns((c) => [...c])
            setTotalCompanies(() => response.data.count);
            setCompanies(() => response.data.companies);
            setLoading(() => false);

            // setCompanies(response.data.map(singleData => singleData.name))
        }).catch(e => {
            alert("Unsuccessful fetching columns");
        });
    }
 }, [page, pageSize])
  return (   
<ThemeProvider theme={defaultMaterialTheme}>
      <MaterialTable 
        // style = {{maxWidth:"90%", overflow:'hidden'}}
        data={companies}
        columns = {columns}
        page = {page}
        isLoading = {loading}
        onChangePage = {(e) => setPage(() => {console.log(e); return e})}
        onChangeRowsPerPage = {(e) => setPageSize(() => {console.log(e); return e})}
        totalCount = {totalCompanies}
        options = {{
            paging:true,
            sorting:false,
            pageSize:pageSize,
            pageSizeOptions:[10, 20, 50],
            headerStyle: {
                fontWeight:'bold',
                position:'sticky',
                top:0
              },
              
              maxBodyHeight:'50vh',
              draggable:false,
              searchFieldAlignment:'left',
              search:true,
              showTitle:false,
        }}
        icons = {{
            Search:SearchIcon,
            ResetSearch:ClearIcon,
            FirstPage:FirstPageIcon,
            PreviousPage:ArrowBackIcon,
            NextPage:ArrowForwardIosIcon,
            LastPage:LastPageIcon
          }}
      />
</ThemeProvider>


  );
}