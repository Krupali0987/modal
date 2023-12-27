import React, { useState, useMemo } from "react";
import './App.css';
import { Button, Modal } from 'antd';



export const Search = () => {

   

    const [searchhh, setSearchhh] = useState();
    const [deleteIndex, setDeleteIndex] = useState(-1)

    // serachdata....... 

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        const searchdata = data.filter((item) => item.fname === searchhh || item.email === searchhh)
        setData(searchdata);
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };


    const [inputdata, setInputdata] = useState({
        fname: "",
        email: "",
        pass: "",
        tel: "",
        college: "",
        year: ""
    })




    const handleChange = (e) => {
        console.log(e.target.value);
        setInputdata({ ...inputdata, [e.target.name]: e.target.value });
    }

    const [data, setData] = useState(JSON.parse(localStorage.getItem("modal")) || [])
    const [isEdit, setisEdit] = useState(-1);

    const handleSubmit = () => {
        setOpen(false)
        if (isEdit !== -1) {
            const editrecord = data.map((item, index) => {
                if (isEdit === index) return inputdata
                else return item
            })
            setData(editrecord)
            localStorage.setItem('modal', JSON.stringify(editrecord));
        } else {

            setData([...data, inputdata]);
            localStorage.setItem('modal', JSON.stringify([...data, inputdata]));
        }
    }

    const [openmodal, setOpenmodal] = useState(false);

    const handleDelete = (index) => {
        setOpenmodal(false)
        const del = data.filter((item, ind) => ind !== index);
        setData(del);
        localStorage.setItem('modal', JSON.stringify(del));
    }

    // Edit data 
    const [open, setOpen] = useState(false);
    const handleEdit = (index) => {
        setOpen(true)
        setisEdit(index);
        const edit = data.find((item, ind) => ind === index);
        setInputdata(edit);

    }

    return (
        <>

            <div className="bg">

                <div style={{ display: "flex", justifyContent: "center", paddingTop: "5%" }}>
                    <div>
                        <table>


                            <tr>
                                <td className="first"><label htmlFor="fname" style={{ fontSize: "23px" }}>Full Name : </label></td>
                                <td className="second"><input type="text" name="fname" placeholder="Full Name " onChange={(e) => handleChange(e)} value={inputdata.fname} style={{ padding: "8px", width: "400px", marginLeft: "15px" }} /></td>
                            </tr>


                            <tr>
                                <td className="first">  <label htmlFor="email" style={{ fontSize: "23px" }}>Email Address : </label></td>
                                <td className="second"> <input type="email" name="email" placeholder="Email " onChange={(e) => handleChange(e)} value={inputdata.email} style={{ padding: "8px", width: "400px", marginLeft: "15px" }} /></td>
                            </tr>


                            <tr>
                                <td className="first"> <label htmlFor="pass" style={{ fontSize: "23px" }}>Password : </label></td>
                                <td className="second">   <input type="password" name="pass" placeholder="Password " onChange={(e) => handleChange(e)} value={inputdata.pass} style={{ padding: "8px", width: "400px", marginLeft: "15px" }} /></td>
                            </tr>

                            <tr>
                                <td className="first">  <label htmlFor="phone" style={{ fontSize: "23px" }}>Phone Number : </label></td>
                                <td className="second">   <input type="tel" name="phone" placeholder="Phone number " onChange={(e) => handleChange(e)} value={inputdata.phone} style={{ padding: "8px", width: "400px", marginLeft: "15px" }} /></td>
                            </tr>

                            <tr>
                                <td className="first">  <label htmlFor="college" style={{ fontSize: "23px" }}>School/College : </label></td>
                                <td className="second">  <input type="text" name="college" placeholder="School/College " onChange={(e) => handleChange(e)} value={inputdata.college} style={{ padding: "8px", width: "400px", marginLeft: "15px" }} /></td>
                            </tr>

                            <tr>
                                <td className="first">  <label htmlFor="year" style={{ fontSize: "23px" }}>Grade/Year : </label></td>
                                <td className="second">  <input type="text" name="year" placeholder="Year " onChange={(e) => handleChange(e)} value={inputdata.year} style={{ padding: "8px", width: "400px", marginLeft: "15px" }} /></td>
                            </tr>
                        </table>

                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <button className="submit" onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>
                </div>

                <div style={{ display: "flex", justifyContent: "center" }}>

                    <Button type="primary" className="search" onClick={showModal}>
                        Search
                    </Button>

                    <Modal title="Search here..." open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        <input type="search" name="search" placeholder="Search... " onChange={(e) => setSearchhh(e.target.value)} value={searchhh} style={{ padding: "8px", width: "400px" }} />
                    </Modal>

                </div>

                <div style={{ display: "flex", justifyContent: "center", paddingTop: "3%" }}>

                    <table style={{ width: "70%", border: "1px solid rgb(10, 34, 50)" }}>
                        <thead>
                            <tr style={{ border: "1px solid rgb(10, 34, 50)" }}>
                                <th className="filed"><b>First Name</b></th>
                                <th className="filed"><b>Email</b></th>
                                <th className="filed"><b>Password</b></th>
                                <th className="filed"><b>Phone</b></th>
                                <th className="filed"><b>College</b></th>
                                <th className="filed"><b>Year</b></th>
                                <th className="filed">Edit</th>
                                <th className="filed">Delete</th>
                            </tr>
                        </thead>
                        <tbody>{data.map((item, index) => {
                            return (
                                <tr>
                                    <td className="userdata">{item.fname}</td>
                                    <td className="userdata">{item.email}</td>
                                    <td className="userdata">{item.pass}</td>
                                    <td className="userdata">{item.phone}</td>
                                    <td className="userdata">{item.college}</td>
                                    <td className="userdata">{item.year}</td>
                                    <td style={{ border: " 1px solid rgb(10, 34, 50)" }}><button className="edit" type="primary" onClick={() => handleEdit(index)}>Edit</button></td>
                                    <Modal
                                        title="Edit box"
                                        centered
                                        open={open}
                                        onOk={() => handleSubmit()}
                                        onCancel={() => setOpen(false)}
                                        width={1000}
                                    >
                                        <table>

                                            <tr>
                                                <td className="first"><label htmlFor="fname" style={{ fontSize: "23px" }}>Full Name : </label></td>
                                                <td className="second"><input type="text" name="fname" placeholder="Full Name " onChange={(e) => handleChange(e)} value={inputdata.fname} style={{ padding: "8px", width: "400px", marginLeft: "15px" }} /></td>
                                            </tr>


                                            <tr>
                                                <td className="first">  <label htmlFor="email" style={{ fontSize: "23px" }}>Email Address : </label></td>
                                                <td className="second"> <input type="email" name="email" placeholder="Email " onChange={(e) => handleChange(e)} value={inputdata.email} style={{ padding: "8px", width: "400px", marginLeft: "15px" }} /></td>
                                            </tr>


                                            <tr>
                                                <td className="first"> <label htmlFor="pass" style={{ fontSize: "23px" }}>Password : </label></td>
                                                <td className="second">   <input type="password" name="pass" placeholder="Password " onChange={(e) => handleChange(e)} value={inputdata.pass} style={{ padding: "8px", width: "400px", marginLeft: "15px" }} /></td>
                                            </tr>

                                            <tr>
                                                <td className="first">  <label htmlFor="phone" style={{ fontSize: "23px" }}>Phone Number : </label></td>
                                                <td className="second">   <input type="tel" name="phone" placeholder="Phone number " onChange={(e) => handleChange(e)} value={inputdata.phone} style={{ padding: "8px", width: "400px", marginLeft: "15px" }} /></td>
                                            </tr>

                                            <tr>
                                                <td className="first">  <label htmlFor="college" style={{ fontSize: "23px" }}>School/College : </label></td>
                                                <td className="second">  <input type="text" name="college" placeholder="School/College " onChange={(e) => handleChange(e)} value={inputdata.college} style={{ padding: "8px", width: "400px", marginLeft: "15px" }} /></td>
                                            </tr>

                                            <tr>
                                                <td className="first">  <label htmlFor="year" style={{ fontSize: "23px" }}>Grade/Year : </label></td>
                                                <td className="second">  <input type="text" name="year" placeholder="Year " onChange={(e) => handleChange(e)} value={inputdata.year} style={{ padding: "8px", width: "400px", marginLeft: "15px" }} /></td>
                                            </tr>
                                        </table>


                                    </Modal>
                                    <td style={{ border: " 1px solid rgb(10, 34, 50)" }}><button className="edit" type="primary" onClick={() => {
                                        setOpenmodal(true); setDeleteIndex(index)
                                    }}>Delete</button></td>

                                </tr>
                            )
                        })}

                        </tbody>
                    </table>
                    <Modal
                        title="Delete Message"
                        centered
                        open={openmodal}
                        onOk={() => handleDelete(deleteIndex)}
                        onCancel={() => setOpenmodal(false)}
                        width={1000}
                    >
                       <p>Are you sure you want to delete this item? </p>
                    </Modal>
                </div>

            </div>

        </>
    )
}