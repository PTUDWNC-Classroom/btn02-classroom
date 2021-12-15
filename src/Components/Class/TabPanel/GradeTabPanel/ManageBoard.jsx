import { Parser } from "json2csv"
import { useContext, useEffect, useState } from "react"
import { CSVLink } from "react-csv"
import { useLocation } from "react-router"
import classroomAxios from "../../../DataConnection/axiosConfig"
import Papa from "papaparse"

import GradeBoard from "../../../Table/GradeBoard"
import { tabsContext } from "../../../../context/TabsContext"
import { Grid, Button } from "@mui/material"
import { styled } from "@mui/material/styles"
import FileDownloadIcon from "@mui/icons-material/FileDownload"
import FileUploadIcon from "@mui/icons-material/FileUpload"

const Input = styled("input")({
  display: "none",
})

const StyledCSVLink = styled(CSVLink)({
  color: "#fff",
  textDecoration: "none",
})

/**
 * Dùng json2csv để chuyển kiểu json sang csv
 * Dùng react-csv để tạo link download file csv
 * Dùng papaparse để đọc nội dung file csv được upload từ máy
 */

export default function ManageBoard() {
  const location = useLocation()
  const { updateGradeStruct } = useContext(tabsContext)

  const classId = location.pathname.split("/")[2]

  let csv = []

  const [data, setData] = useState([])

  useEffect(() => {
    const GradeAssignmentData = async () => {
      try {
        const response = await classroomAxios.post(
          `assignment/getGradeAssignment`,
          {
            classId: classId,
          }
        )
        if (response) {
          // Trả dữ liệu đã sắp xếp
          setData(response.data)
          updateGradeStruct(response.data)
        }
      } catch (error) {
        console.error(error)
      }
    }

    GradeAssignmentData()

    //console.log("update")
    // eslint-disable-next-line
  }, [classId])

  if (data.length !== 0) {
    // data.map để lấy dữ liệu chỉ còn 2 trường là gradeTitle và gradeDetail
    /**
     * result = [
     *      {
     *         gradeTitle:
     *         gradeDetail:
     *      }
     * ]
     */
    let result = data.map(function (a) {
      let item = {
        gradeTitle: a.gradeTitle,
        gradeDetail: a.gradeDetail,
      }
      return item
    })

    //Khởi tạo và parses
    const json2parse = new Parser()
    csv = json2parse.parse(result)

    console.log(csv)
  }

  return (
    <>
      {/**
       * parse csv bằng Papa.parse()
       * Lấy dữ liệu vừa parse được từ results.data
       */}
      <Grid container spacing={3} mb={3}>
        <Grid item>
          <label htmlFor="student-list-file">
            <Input
              accept=".csv,.xlsx,.xls"
              id="student-list-file"
              type="file"
              onChange={(e) => {
                const files = e.target.files
                console.log(files)
                if (files) {
                  console.log(files[0])
                  Papa.parse(files[0], {
                    complete: function (results) {
                      console.log("Finished:", results.data)
                    },
                  })
                }
              }}
            />
            <Button
              variant="contained"
              component="span"
              startIcon={<FileUploadIcon />}
            >
              Upload student list
            </Button>
          </label>
        </Grid>

        {/* Kiểm tra csv có dữ liệu không */}
        {/* Lấy dữ liệu từ csv và do csv có kiểu a,b nên separator="," */}
        {/* Đặc tên file */}
        {csv.length !== 0 && (
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<FileDownloadIcon />}
            >
              <StyledCSVLink
                data={csv}
                separator=","
                filename={"my-file.csv"}
                className="btn btn-primary"
                target="_blank"
              >
                Download
              </StyledCSVLink>
            </Button>
          </Grid>
        )}
      </Grid>
      <GradeBoard />
    </>
  )

  // return (
  //     <div className="App">
  //         <input
  //             type="file"
  //             accept=".csv,.xlsx,.xls"
  //             onChange={(e) => {
  //                 const files = e.target.files;
  //                 console.log(files);
  //                 if (files) {
  //                     console.log(files[0]);
  //                     Papa.parse(files[0], {
  //                         complete: function (results) {
  //                             console.log("Finished:", results.data);
  //                         }
  //                     }
  //                     )
  //                 }
  //             }}
  //         />
  //     </div>
  // );
}
