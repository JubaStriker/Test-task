import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { AuthContext } from "../authContext";

const AdminDashboardPage = () => {

  const { state } = React.useContext(AuthContext);
  const token = state.token;
  console.log(token)


  const body = {
    "payload": {},
    "page": 1,
    "limit": 10
  }


  const [page, setPage] = useState(1)
  const [pageData, setPageData] = useState()

  useEffect(() => {
    console.log("use effect")
    fetch(`https://reacttask.mkdlabs.com/v1/api/rest/video/PAGINATE`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-project': 'cmVhY3R0YXNrOmQ5aGVkeWN5djZwN3p3OHhpMzR0OWJtdHNqc2lneTV0Nw==',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(data => {
        setPageData(data)
      })

  }, [])


  return (
    <>
      <div className="w-full flex justify-center items-center text-7xl h-screen text-gray-700 ">
        Dashboard
      </div>
    </>
  );
};

export default AdminDashboardPage;
