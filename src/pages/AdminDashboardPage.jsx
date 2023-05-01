import React, { useState } from "react";
import { useEffect } from "react";
import { AuthContext } from "../authContext";
import { useNavigate } from "react-router";

const AdminDashboardPage = () => {

  const { state, dispatch } = React.useContext(AuthContext);
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

  const handleLogOut = () => {

    dispatch({ type: 'LOGOUT' });
    const navigate = useNavigate()
    navigate('/')

  }


  return (
    <>
      <div className="w-full h-screen bg-black py-10 px-20 ">
        <div className="flex justify-between">
          <h1 className="text-3xl font-extrabold text-white">APP</h1>
          <button onClick={handleLogOut} className="btn text-slate-700 rounded-xl rounded-l-3xl rounded-r-3xl px-5 py-2 bg-[#9BFF00]">Log out</button>
        </div>
      </div>
    </>
  );
};

export default AdminDashboardPage;
