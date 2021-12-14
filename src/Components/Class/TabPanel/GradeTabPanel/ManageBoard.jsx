import { Parser } from "json2csv";
import { useEffect, useState } from "react";
import { CSVLink } from "react-csv";
import { useLocation } from "react-router";
import classroomAxios from "../../../DataConnection/axiosConfig";
import Papa from "papaparse";

/**
 * Dùng json2csv để chuyển kiểu json sang csv
 * Dùng react-csv để tạo link download file csv
 * Dùng papaparse để đọc nội dung file csv được upload từ máy
 */

export default function ManageBoard() {
    const location = useLocation();

    const classId = location.pathname.split("/")[2];

    let csv = [];

    const [data, setData] = useState([]);

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
                    setData(response.data);
                }
            } catch (error) {
                console.error(error)
            }
        }

        GradeAssignmentData()

        //console.log("update")
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
        let result = data.map(
            function (a) {
                let item = {
                    gradeTitle: a.gradeTitle,
                    gradeDetail: a.gradeDetail
                }
                return item;
            }
        );
        
        //Khởi tạo và parses
        const json2parse = new Parser();
        csv = json2parse.parse(result);

        console.log(csv);
    }



    return (
        <>
            {/* Kiểm tra csv có dữ liệu không */}
            {/* Lấy dữ liệu từ csv và do csv có kiểu a,b nên separator="," */}
            {/* Đặc tên file */}
            {csv.length !== 0 ? <CSVLink
                data={csv} separator=","     
                filename={"my-file.csv"}     
                className="btn btn-primary"
                target="_blank"
            >
                Download me
            </CSVLink>: null}
            {/**
             * parse csv bằng Papa.parse()
             * Lấy dữ liệu vừa parse được từ results.data
             */}
            <div className="App">
                <input
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    onChange={(e) => {
                        const files = e.target.files;
                        console.log(files);
                        if (files) {
                            console.log(files[0]);
                            Papa.parse(files[0], {
                                complete: function (results) {
                                    console.log("Finished:", results.data);
                                }
                            }
                            )
                        }
                    }}
                />
            </div>
        </>
    );


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

