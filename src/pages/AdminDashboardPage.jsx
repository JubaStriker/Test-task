import React, { useState } from "react";
import { useEffect } from "react";
import { AuthContext } from "../authContext";
import { useNavigate } from "react-router";
import { FaLevelUpAlt } from 'react-icons/fa'
const AdminDashboardPage = () => {

  const { state, dispatch } = React.useContext(AuthContext);
  const token = state.token;


  const [page, setPage] = useState(1)

  const body = {
    "payload": {},
    "page": page,
    "limit": 10
  }



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
        setPage(data.page)
        setPageData(data.list)
      })

  }, [page])
  console.log(page)

  const handleNext = (page) => {
    setPage(page + 1)
  }
  const handlePrev = (page) => {
    if (page > 0) {
      setPage(page - 1)
    }
  }
  console.log(page)
  const handleLogOut = () => {

    dispatch({ type: 'LOGOUT' });
    const navigate = useNavigate()
    navigate('/')

  }


  return (
    <>
      <div className="w-full bg-black py-10 px-20 ">
        <div className="flex justify-between">
          <h1 className="text-3xl font-extrabold text-white">APP</h1>
          <button onClick={handleLogOut} className="btn text-slate-700 rounded-xl rounded-l-3xl rounded-r-3xl px-5 py-2 bg-[#9BFF00]">Log out</button>
        </div>

        <div className="mt-24">
          <h1 className="text-4xl text-white">Today's LeaderBoard</h1>
        </div>
        <div className="flex flex-col text-white">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead className=" border-b">
                    <tr>
                      <th scope="col" className="text-sm font-medium  px-6 py-4 text-left">
                        #
                      </th>
                      <th scope="col" className="text-sm font-medium  px-6 py-4 text-left">
                        Title
                      </th>
                      <th scope="col" className="text-sm font-medium  px-6 py-4 text-left">

                      </th>
                      <th scope="col" className="text-sm font-medium  px-6 py-4 text-left">
                        Author
                      </th>
                      <th scope="col" className="text-sm font-medium  px-6 py-4 text-left">
                        Most Liked
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {pageData?.map((data, i) =>
                      <tr key={i} className=" border-b">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium ">{i + 1}</td>
                        <td className="text-sm  font-light px-6 py-4 whitespace-nowrap">
                          <img src={data?.photo} alt="" className="h-16 w-[118px] rounded-xl" />
                        </td>
                        <td className="text-base px-6 py-4">
                          <p className="max-w-sm">{data?.title}</p>
                        </td>
                        <td className="text-sm  font-light px-6 py-4 whitespace-nowrap">
                          {data?.username}
                        </td>
                        <td className="text-sm  font-light px-6 py-4 whitespace-nowrap">
                          <p> {data?.like} < FaLevelUpAlt className='inline text-[#9BFF00]' /></p>

                        </td>
                      </tr>
                    )}

                  </tbody>
                </table>
                <div className="flex justify-between mt-10 mb-20">
                  <button onClick={() => handlePrev(page)} className="btn text-slate-700 rounded-xl rounded-l-3xl rounded-r-3xl px-5 py-2 bg-[#9BFF00]">Prev</button>
                  <h1 className="text-white">Page: {page}</h1>
                  <button onClick={() => handleNext(page)} disabled={page === 0} className="btn text-slate-700 rounded-xl rounded-l-3xl rounded-r-3xl px-5 py-2 bg-[#9BFF00]">Next</button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default AdminDashboardPage;
