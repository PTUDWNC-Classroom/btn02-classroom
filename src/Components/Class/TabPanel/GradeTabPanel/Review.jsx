
import axios from "axios";
import { useEffect, useState } from "react"



export default function Review() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const getData = async() => {
            try {
                const res = await axios.get("https://jsonplaceholder.typicode.com/users")
                console.log(res.data)
                setData(res.data)
                //console.log(res.data)
            } catch (error) {
                console.error(error);
            }
        }

        getData();

    }, [])

    return (
        <>
            {data &&
                data.map(function (val, index) {
                    return (
                        <li key={index}>
                            {val.username}
                        </li>
                    )
                })
            }
        </>
    )
}