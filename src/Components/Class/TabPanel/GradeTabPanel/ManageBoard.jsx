import { useContext, useEffect, useRef, useState } from "react"
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
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile"


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
  const [studentList, setStudentList] = useState([])
  const [a, seta] = useState([]);
  const location = useLocation()
  const { gradeStruct, updateGradeStruct, countRerender, rerender } = useContext(tabsContext)
  const csvLink = useRef();
  const classId = location.pathname.split("/")[2]

  //let csv = []
  //console.log(gradeStruct[0].gradeTitle);
  const studentListTemplate = [["StudentId", "Fullname"]]

  const getDataExport = async () => {
    const assignmentIdList = gradeStruct.map(val => val._id);
    let res = [];
    await classroomAxios.post(`assignment/getDataToExport`,
      {
        classId: classId,
        assignmentIdList: assignmentIdList,
      }).then((r) => {
        seta(r.data)
        res = r.data;
      })
      .catch((e) => console.log(e))

    if (res.length !== 0) {
      csvLink.current.link.click();
    }
  }

  const handleUploadStudentList = (value) => {
    setStudentList(value)
    countRerender()
  }

  // Update grade struct to render when the user change class
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
          updateGradeStruct(response.data)
        }
      } catch (error) {
        console.error(error)
      }
    }
    console.log("assignment/getGradeAssignment")
    GradeAssignmentData()
    //console.log("update")
    // eslint-disable-next-line
  }, [classId, rerender])

  useEffect(() => {
    // Call API to upload student list
    const uploadStudentList = async () => {
      try {
        console.log("upload student list")

        const res = classroomAxios.post("assignment/upload-student-list", {
          classId: classId,
          data: studentList,
        })

        res.then((result) => {
          console.log(result)
        })
      } catch (error) {
        console.error(error)
      }
    }

    if (studentList.length !== 0) {
      uploadStudentList()
    }

    // eslint-disable-next-line
  }, [studentList])

  // if (data.length !== 0) {
  //   // data.map để lấy dữ liệu chỉ còn 2 trường là gradeTitle và gradeDetail
  //   /**
  //    * result = [
  //    *      {
  //    *         gradeTitle:
  //    *         gradeDetail:
  //    *      }
  //    * ]
  //    */
  //   let result = data.map(function (a) {
  //     let item = {
  //       gradeTitle: a.gradeTitle,
  //       gradeDetail: a.gradeDetail,
  //     }
  //     return item
  //   })

  //   //Khởi tạo và parses
  //   const json2parse = new Parser()
  //   csv = json2parse.parse(result)

  //   console.log(csv)
  // }

  return (
    <>
      {/**
       * parse csv bằng Papa.parse()
       * Lấy dữ liệu vừa parse được từ results.data
       */}
      <Grid container spacing={3} mb={3}>
        <Grid container item spacing={3} xs={12} sm={12} md={10}>
          <Grid item xs={12} sm={6} lg={4}>
            <label htmlFor="student-list-file">
              <Input
                accept=".csv"
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
                        handleUploadStudentList(results.data)
                      },
                      skipEmptyLines: true,
                    })
                  }
                }}
              />
              <Button
                fullWidth
                variant="contained"
                component="span"
                startIcon={<FileUploadIcon />}
              >
                Upload student list (.csv file)
              </Button>
            </label>
          </Grid>

          {/* Kiểm tra csv có dữ liệu không */}
          {/* Lấy dữ liệu từ csv và do csv có kiểu a,b nên separator="," */}
          {/* Đặc tên file */}
          <Grid item xs={12} sm={6} lg={4}>
            <Button
              fullWidth
              variant="contained"
              color="secondary"
              startIcon={<FileDownloadIcon />}
            >
              <StyledCSVLink
                data={studentListTemplate}
                separator=","
                filename={"student-list-template.csv"}
                className="btn btn-primary"
                target="_blank"
              >
                Download student list template
              </StyledCSVLink>
            </Button>
          </Grid>
        </Grid>
        <Grid container item xs={12} sm={3} md={2}>
          <Button
            fullWidth
            variant="contained"
            color="success"
            startIcon={<InsertDriveFileIcon />}
            onClick={getDataExport}
          >
            Export
          </Button>
          <StyledCSVLink
            data={a}
            separator=","
            filename={"manageBoard.csv"}
            className="btn btn-primary"
            target="_blank"
            ref={csvLink}
          />
        </Grid>
      </Grid>

      <GradeBoard />
    </>
  )
}
