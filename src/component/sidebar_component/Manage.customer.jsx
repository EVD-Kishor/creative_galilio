// Importing necessary components and icons from Material-UI
import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel"; // Import CancelIcon for false values
import MoreVertIcon from "@mui/icons-material/MoreVert";

// Define table columns
const columns = [
  { id: "icon", label: "", width: 10, align: "center", renderIcon: true },
  { id: "cgId", label: "CGID", width: 100 },
  { id: "name", label: "Name", width: 170 },
  { id: "dialCode", label: "Dial code", width: 80 },
  { id: "mobile", label: "Mobile", width: 100 },
  { id: "email", label: "Email", width: 100 },
  { id: "recordStatus", label: "Status", width: 100 },
];

export default function ManageCustomer() {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(50); // Initial rows per page limit

  // Formik for managing form state and submission
  const formik = useFormik({
    initialValues: {
      cgId: "",
      name: "",
      email: "",
      mobile: "",
      status: "",
      dialCode: "",
    },
    onSubmit: (values) => {
      setPage(1);
      refetch();
    },
  });
  const { values } = formik;

  // Fetch customer data using useQuery hook
  const { isLoading, data, refetch } = useQuery({
    queryKey: [
      "customerData",
      {
        pageNo: page,
        pageSize: rowsPerPage,
        paginated: true,
        cgId: values.cgId,
        name: values.name,
        email: values.email,
        mobile: values.mobile,
        recordStatus: values.status,
        dialCode: values.dialCode,
      },
    ],
    queryFn: ({ queryKey }) => {
      const filteredParams = Object.fromEntries(
        Object.entries(queryKey[1]).filter(
          ([key, value]) => value !== "" && value !== null
        )
      );

      return fetch(
        `https://cgv2.creativegalileo.com/api/V1/customer/filter?${new URLSearchParams(
          filteredParams
        )}`,
        {
          method: "GET",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2Yzg4ZjAwZi0wYWI4LTExZWUtOGZjOC0wYTU0NDNmNmE5NzgiLCJlbnRpdHlUeXBlIjoidXNlciIsInYiOiIwLjEiLCJpYXQiOjE3MDY1MDcxNjMsImV4cCI6MTczODA2NDc2M30.DLWxMAdaupi_559pwGdQyVH_rmQWS1zr_FZUJWp_w9U",
          },
        }
      ).then((res) => res.json());
    },
    enabled: false,
    placeholderData: (prev) => prev,
  });

  // Reset form and refetch data
  const handelReset = () => {
    formik.resetForm();
    refetch();
  };
console.log(formik,"formik")
  const { setFieldValue } = formik;

  // Fetch data when page or rows per page changes
  useEffect(() => {
    refetch();
  }, [refetch, page, rowsPerPage]);

  return (
    <>
      {" "}
      <Box sx={{ padding: "30px", background: "#f0f0f0" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            margin: "0px 0 20px 0",
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Customer
          </Typography>
          <Button
            sx={{
              background: "#ffec3a",
              color: "black",
              textTransform: "capitalize",
              padding: "2px 15px",
            }}
          >
            +Create
          </Button>
        </Box>
        <form onSubmit={formik.handleSubmit}>
          <Grid container sx={{ padding: "10px", background: "white" }}>
            <Grid item xs={1.5}>
              <TextField
                placeholder="CG ID"
                size="small"
                id="cgId"
                name="cgId"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.cgId}
              />
            </Grid>
            <Grid item xs={1.5} sx={{ marginLeft: "10px" }}>
              <TextField
                placeholder="Name"
                size="small"
                id="name"
                name="name"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.name}
              />
            </Grid>
            <Grid item xs={1.5} sx={{ marginLeft: "10px" }}>
              <TextField
                placeholder="Dial Code"
                size="small"
                id="dialCode"
                name="dialCode"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.dialCode}
              />
            </Grid>
            <Grid item xs={1.5} sx={{ marginLeft: "10px" }}>
              <TextField
                placeholder="Mobile"
                size="small"
                id="mobile"
                name="mobile"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.mobile}
              />
            </Grid>
            <Grid item xs={1.5} sx={{ marginLeft: "10px" }}>
              <TextField
                placeholder="Email"
                size="small"
                id="email"
                name="email"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </Grid>
            <Grid item xs={1.5} sx={{ marginLeft: "10px" }}>
              <div>
                <Select
                  size="small"
                  sx={{ padding: 0 }}
                  id="status"
                  fullWidth
                  name="status"
                  aria-label="Status"
                  displayEmpty
                  defaultValue=""
                  onChange={(event) => setFieldValue("status",event.target.value)}
                >
                  <MenuItem value="" disabled>
                    Status
                  </MenuItem>
                  <MenuItem value={true}>True</MenuItem>
                  <MenuItem value={false}>False</MenuItem>
                </Select>
              </div>
            </Grid>
            <Grid
              item
              xs={2.3}
              sx={{ justifyContent: "flex-end", display: "flex" }}
            >
              <Button type="submit">
                {" "}
                <SearchIcon fontSize="medium" style={{ color: "403d3b" }} />
              </Button>
              <Button onClick={handelReset}>
                <RestartAltIcon
                  fontSize="medium"
                  style={{ color: "#403d3b" }}
                />
              </Button>
            </Grid>
          </Grid>
        </form>
        <Paper sx={{ width: "100%", overFlow: "hidden" }}>
          <TableContainer sx={{ maxHeight: "65vh", overflowY: "scroll", '&::-webkit-scrollbar': { display: 'none' } }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align="left"
                      style={{
                        minWidth: column.width,
                        backgroundColor: "#f0f0f0",
                        textAlign: "center",
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={columns.length}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <CircularProgress />
                    </Box>
                  </TableCell>
                </TableRow>
              ) : data?.data.customers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length}>
                    <Typography variant="body1" align="center">
                      No data available.
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                <TableBody>
                  {data?.data.customers.map((row, rowIndex) => (
                    <TableRow key={row.cgId} hover>
                      {columns.map((column, columnIndex) => (
                        <TableCell
                          key={column.id}
                          align="center"
                          sx={{ padding: "1px" }}
                        >
                          {columnIndex === 0 && column.id === "icon" ? (
                            row[column.id] ? (
                              <MoreVertIcon style={{ color: "green" }} fontSize="small" />
                            ) : (
                              <MoreVertIcon style={{ color: "green" }} fontSize="small" />
                            )
                          ) : column.id === "recordStatus" ? (
                            !row[column.id] ? (
                              <CancelIcon
                                fontSize="10pz"
                                style={{ color: "red", alignItem: "center" }}
                              />
                            ) : (
                              <CheckCircleIcon
                                fontSize="10px"
                                style={{ color: "green", alignItems: "center" }}
                              />
                            )
                          ) : (
                            row[column.id]
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              )}
            </Table>
          </TableContainer>
          {!isLoading && (
            <TablePagination
              component="div"
              count={data?.data.count ?? 0}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={(event, newPage) => {
                setPage(newPage);
              }}
              onRowsPerPageChange={(event) => {
                setRowsPerPage(+event.target.value);
                setPage(1);
              }}
            />
          )}
        </Paper>
      </Box>
    </>
  );
}
