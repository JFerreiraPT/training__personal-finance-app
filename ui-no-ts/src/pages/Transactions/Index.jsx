import React, { Suspense, useCallback, useEffect, useState } from "react";
import { Box, useTheme } from "@mui/system";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";

import useFetch from "../../hooks/use-fetch";

import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

import Header from "../../components/Header";
import { Typography } from "@mui/material";
import { json, useLoaderData, defer, Await } from "react-router-dom";

const TRANSACTIONS_URL = "http://localhost:8000/api/transactions";

const Transactions = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [transactions, setTransactions] = useState(null);

  const { isLoading, error, get } = useFetch();

  const [paginationModel, setPaginationModel] = useState({
    pageSize: 15,
    page: 0,
  });

  //we will use load on this page instead
  //let {transactions} = useLoaderData();

  const newFetchLoad = useCallback((data) => {
    setTransactions(data);
  }, []);

  useEffect(() => {
    get(
      {
        url:
          TRANSACTIONS_URL +
          `?page=${paginationModel.page + 1}&take=${paginationModel.pageSize}`,
      },
      newFetchLoad
    );
  }, [paginationModel, get, newFetchLoad]);

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
    },
    {
      field: "amount",
      headerName: "Amount",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "date",
      headerName: "Date",
      flex: 1,
      renderCell: ({ row: { date } }) => {
        return <Typography>{new Date(date).toLocaleDateString()}</Typography>;
      },
    },
    {
      field: "type",
      headerName: "Type",
      flex: 1,
      renderCell: ({ row: { type } }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              type === "revenue"
                ? colors.greenAccent[600]
                : colors.redAccent[500]
            }
            borderRadius="4px"
          >
            {type === "expense" && <ArrowForwardOutlinedIcon />}
            {type === "revenue" && <ArrowBackOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {type}
            </Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {!isLoading && transactions && (
        <Box m="20px">
          <Header title="Transactions" subtitle="Transactions History" />
          <Box
            m="40px 0 0 0"
            height="75vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: colors.greenAccent[300],
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: colors.blueAccent[700],
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400],
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: colors.blueAccent[700],
              },
            }}
          >
            <DataGrid
              rows={transactions.data}
              columns={columns}
              //rowCount={transactions.meta["last_page"]}
              rowCount={transactions.meta["total"]}
              loading={isLoading}
              pageSizeOptions={[5, 15, 25]}
              paginationModel={paginationModel}
              paginationMode="server"
              onPaginationModelChange={setPaginationModel}
            />
          </Box>
        </Box>
      )}
    </>
  );

  /*
   * VERSION WERE WE USED USELOADER FUNCTION
   */
  // return (
  //   <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
  //     <Await resolve={transactions}>
  //       {(loadTransactions) => (
  //         <Box m="20px">
  //           <Header title="Transactions" subtitle="Transactions History" />
  //           <Box
  //             m="40px 0 0 0"
  //             height="75vh"
  //             sx={{
  //               "& .MuiDataGrid-root": {
  //                 border: "none",
  //               },
  //               "& .MuiDataGrid-cell": {
  //                 borderBottom: "none",
  //               },
  //               "& .name-column--cell": {
  //                 color: colors.greenAccent[300],
  //               },
  //               "& .MuiDataGrid-columnHeaders": {
  //                 backgroundColor: colors.blueAccent[700],
  //                 borderBottom: "none",
  //               },
  //               "& .MuiDataGrid-virtualScroller": {
  //                 backgroundColor: colors.primary[400],
  //               },
  //               "& .MuiDataGrid-footerContainer": {
  //                 borderTop: "none",
  //                 backgroundColor: colors.blueAccent[700],
  //               },
  //             }}
  //           >
  //             {console.log(loadTransactions)}
  //             <DataGrid
  //               rows={loadTransactions.data}
  //               columns={columns}
  //               rowCount={loadTransactions.meta["last_page"]}
  //               loading={isLoading}
  //               pageSizeOptions={[5, 15, 25]}
  //               paginationModel={paginationModel}
  //               paginationMode="server"
  //               onPaginationModelChange={setPaginationModel}
  //             />
  //           </Box>
  //         </Box>
  //       )}
  //     </Await>
  //   </Suspense>
  // );
};

export default Transactions;

async function loadTransactions() {
  const response = await fetch(TRANSACTIONS_URL);

  if (!response.ok) {
    throw json(
      {
        message: "Could not fetch events.",
      },
      { status: 500 }
    );
  } else {
    const resData = await response.json();
    console.log(resData);
    return resData;
  }
}

export function loader() {
  return defer({
    transactions: loadTransactions(),
  });
}
