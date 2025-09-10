import React, { useState,useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { LogoutOutlined } from '@ant-design/icons';
import {
  ContainerOutlined,
  PieChartOutlined,
  AppstoreOutlined,
} from '@ant-design/icons';
import { useLocation } from "react-router-dom";
import { Button, Popconfirm,Menu,Input } from 'antd';
import ClientImg from './14b9c2d3fc8e930d59126591c1fcbbfd.png'
import { Form, Select, Upload, Card, Row, Col } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { Table,DatePicker } from 'antd';
import { message,Cascader  } from 'antd';
import axios from 'axios'

const { RangePicker } = DatePicker;
const token = localStorage.getItem("token");



const { Option } = Select;


const { Search } = Input;
const items = [
  {
    key: '1',
    icon: <ContainerOutlined  />,
    label: 'Invoices',
  },
  {
    key: '3',
    icon: <PieChartOutlined/>,
    label: 'Generate invoice',
  },
  {
    key: '2',
    icon: <AppstoreOutlined/>,
    label: 'Clients',
  },
];

const onSearch = (value, _e, info) => console.log(info?.source, value);

const Dashboard = () => {
  const location = useLocation();
  const data = location.state;
  const [recentInvoices, setRecentInvoices] = useState([]);
  const [allInvoices, setAllInvoices] = useState([]);
  const [form] = Form.useForm();
  const [clients, setClients] = useState([]);
  const [client, setClient] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [clientInvoices,setclientInvoices]=useState([]);
  const [clientForm] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [clientId, setClientId] = useState(''); // Assuming clientId is available in state
  const [editClientDet,setEditClientDet]=useState([])
  const [tempvalue,settempvalue]=useState()
  const [userID,setuserID]=useState()
  const [tokenforaccess,settokenAccess]=useState(data.token)
  const [options, setOptions] = useState([]);
  const [generateInvoiceid,setgenerateInvoiceid]=useState()
  const [selectedClient, setSelectedClient] = useState()

  console.log(tokenforaccess);
  



  const columns = [
    {
      title: 'Invoice ID',
      dataIndex: 'invoice_id',  // Corrected to match data
      key: 'invoice_id',         // Corrected to match data
    },
    {
      title: 'Client Name',
      dataIndex: 'client_name',      // Corrected to match data
      key: 'client',            // Corrected to match data
    },
    {
      title: 'Issue Date',
      dataIndex: 'date_of_invoice_generation',   // No change needed
      key: 'date_of_invoice_generation',         // No change needed
      render: (text) => formatDateToDDMMYYYY(text),
    },
    {
      title: 'Total Amount',
      dataIndex: 'payable_amount',  // Corrected to match data
      key: 'totalValue',        // Corrected to match data
    },
    {
      title: 'Invoice Link',
      dataIndex: 'invoice_link',      // Add this key in your data array if it doesn't exist
      key: 'status',
      render: (text, record) => (
        <a href={text} target="_blank" rel="noopener noreferrer">
          Click here to view Invoice
        </a>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        
        <Popconfirm
          title="Are you sure to delete this invoice?"
          onConfirm={() => deleteInvoice(record.invoice_id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary" danger>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ];
  
  const deleteInvoice = async (invoice_Id) => {
    console.log("Deleting invoice with ID:", invoice_Id);
    try {
      const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/invoices/delete-invoice-id/${invoice_Id}`,{headers:{"Authorization":`Bearer ${tokenforaccess}`,},});
      console.log('Response:', response);  // Log the response to see what is returned
      message.success('Invoice deleted successfully!');
      // Refresh the table data or handle state update if needed
    } catch (error) {
      console.error('Error deleting invoice:', error.response || error.message || error);
      if (error.response) {
        // Server responded with a status other than 2xx
        message.error(`Failed to delete invoice: ${error.response.data.message || 'Server error'}`);
      } else if (error.request) {
        // Request was made but no response was received
        message.error('No response from server. Check your network or server status.');
      } else {
        // Something else caused the error
        message.error(`Error: ${error.message}`);
      }
    }
  };
  // const [form] = Form.useForm();
  
  // Update form fields whenever editClientDet changes
  useEffect(() => {
    console.log("editClientDet changed:", editClientDet);
    if (editClientDet) {
      clientForm.resetFields(); // Reset the form before setting new values
      clientForm.setFieldsValue({
        // clientLogo:editClientDet.image_url,
        country: editClientDet.country,
        companyName: editClientDet.company_name,
        firstName: editClientDet.first_name,
        lastName: editClientDet.last_name,
        email: editClientDet.email,
        gstin:editClientDet.gst_no,
        phoneNumber: editClientDet.phone,
        addressLine1: editClientDet.address,
        postalCode: editClientDet.postal,
        city: editClientDet.city,
      });
      setuserID(editClientDet.client_id);
      setcompany_name(editClientDet.company_name);
      setfirst_name(editClientDet.first_name);
      setlast_name(editClientDet.last_name);
      setemail(editClientDet.email);
      setgstin(editClientDet.gst_no);
      setphone(editClientDet.phone);
      setaddress(editClientDet.address);
      setpostal(editClientDet.postal);
      setcity(editClientDet.city);
      setcountry(editClientDet.country);
      // setuserID(editClient.client_id);
    }
  }, [editClientDet, clientForm]);
  // useEffect(() => {
    // Fetch client data when component mounts
    const loadClientData = async (clientId) => {
      try {
        setIsLoading(true);
        const response = await fetch();
        const clientData = await response.json();
        clientForm.setFieldsValue({
          companyName: clientData.companyName,
          firstName: clientData.firstName,
          lastName: clientData.lastName,
          email: clientData.email,
          country: clientData.country,
          phoneNumber: clientData.phoneNumber,
          addressLine1: clientData.addressLine1,
          postalCode: clientData.postalCode,
          city: clientData.city,
          clientLogo: clientData.clientLogo ? [{ url: clientData.clientLogo, name: 'Client Logo' }] : [],
        });
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading client data:', error);
        message.error('Failed to load client data.');
        setIsLoading(false);
      }
    };

    if (clientId) {
      loadClientData();
    }
  // }, [clientId, clientForm]);

  const transformFile = (event) => {
    if (Array.isArray(event)) {
      return event;
    }
    return event?.fileList;
  };
  const [edituserID,setedituserID]=useState()
  const handleFormSubmit = async (formData) => {
    const cdata = {image_url:editClientDet.image_url,gst_no:gstin,userId:userID,company_name:company_name,first_name:first_name,last_name:last_name,country:country,email:email,phone:phone,postal:postal,address:address,city:city}
    console.log(cdata)
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/clients/update-client`, {
        method: 'PUT',
        headers: {
          "Content-Type":"application/json",
          "Authorization":`Bearer ${tokenforaccess}`,
        },
        body: JSON.stringify(cdata) 
      });
  
      console.log(response);
      
      if (response.ok) {
        message.success('Client Update successfully!');
        form.resetFields(); // Clear the form after successful submission
      } else {
        message.error('Failed to Update client.');
      }}
     catch (error) {
      console.error('Error submitting form:', error);
      message.error('An error occurred while Updating the client.');
    }
  };
  

    // const [options, setOptions] = useState([]);
  
    // useEffect(() => {
    //   // Fetch client data
    //     .then(response => {
    //       // Assuming response.data is an array of clients
    //       const formattedOptions = response.data.map(client => ({
    //         value: client.id,
    //         label: client.name,
    //         // Add additional fields if necessary
    //       }));
    //       setOptions(formattedOptions);
    //     })
    //     .catch(error => {
    //       console.error('Error fetching clients:', error);
    //     });
    // }, []); // Empty dependency array means this runs once on mount
  
   



  useEffect(() => {
    fetchClientData();
    // fetchClientInvoices();
  }, []);
  const fetchClientData = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/clients/get-clients`,{headers:{"Authorization":`Bearer ${data.token}`}}); // Replace with your actual API endpoint
      const data = await response.json();
      setClient(data);
      console.log("Fetching Client Data",data);
      const formattedOptions = data.map(client => ({
        value: client.client_id,    
        label: client.first_name,  
      }));
      
      setOptions(formattedOptions);
      
    } catch (error) {
      console.error('Error fetching client data:', error);
    }
  };

  
  const fetchClientInvoices = async (keys) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/invoices/get-all-invoices/${keys}`, {
        headers: {
          // "Authorization":`Bearer ${tokenforaccess}`
          "Authorization":`Bearer ${tokenforaccess}`
          // "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcyMzM5ODYyMiwiZXhwIjoxNzIzNDg1MDIyfQ.Ki4T7zIIAP2I7mReNxpSXtP_xABgIEkGFFXxOrX21DQ"
          // "Authorization":`Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const clientInvoices = await response.json();
      setclientInvoices(clientInvoices);
      console.log("Invoices Data:", clientInvoices);
      
    } catch (error) {
      console.error('Error fetching invoices:', error);
    }
  };
  
  // fetchClientInvoices(1) 
  // if (!client) return <p>Loading...</p>;

  const handleDeleteClient = async (clientId) => {
    // Step 1: Confirmation dialog
    console.log(clientId);
    
    // const confirmDelete = window.confirm("Are you sure you want to delete this client?");
    // if (!confirmDelete) return;

    try {
      // Step 2: API call to delete the client
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/clients/delete-client/${clientId}`, {
        method: 'DELETE',
        headers: {
          "Authorization":`Bearer ${tokenforaccess}`
          // "Authorization": `Bearer ${token}`
        }
      });
      

      if (response.ok) {
        // Step 3: Notify user of success and update UI
        message.success('Client deleted successfully.');
        setClient(null);  // Remove the client from the state
        setInvoices([]);   // Clear the associated invoices
        // Additional logic to update the list of clients if necessary
      } else {
        // Handle errors
        const errorData = await response.json();
        message.error(`Failed to delete client: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error deleting client:', error);
      message.error('An error occurred while deleting the client.');
    }
  }

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
       const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/clients/get-clients`,{headers:{"authorization":`Bearer ${token}`}}); // Replace with your actual API endpoint
      const data = await response.json();
      setClients(data);
      console.log("Fetching Clients",data);
      const formattedOptions = data.map(client => ({
        value: client.client_id,    
        label: client.first_name,  
      }));
      
      setOptions(formattedOptions);
      
    } catch (error) {
      console.error('Error fetching client data:', error);
    }
  };
  
useEffect(() => {
  // Fetch data from the backend when the component mounts
  fetchRecentInvoices();
  fetchAllInvoices();
}, []);

const fetchRecentInvoices = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/invoices/get-all-invoicess`,{headers:{"Authorization":`Bearer ${token}`}}); // Replace with your actual API endpoint
    const data = await response.json();
    setRecentInvoices(data);
    console.log("Fetching Recent Invoices",data);
    
  } catch (error) {
    console.error('Error fetching recent invoices:', error);
  }
};

const fetchAllInvoices = async () => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/invoices/get-all-invoicess`,{headers:{"Authorization": `Bearer ${token}`}}); // Replace with your actual API endpoint
    const all_invoices_data = await response.json();
    setAllInvoices(all_invoices_data);
    console.log("Fetching All Invoices",all_invoices_data);
    
  } catch (error) {
    console.error('Error fetching all invoices:', error);
  }
};

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const [image_url,setimage_url]=useState()
const [company_name,setcompany_name]=useState() 
const [first_name,setfirst_name]=useState() 
const [last_name,setlast_name]=useState() 
const [email,setemail]=useState() 
const [country,setcountry]=useState() 
const [phone,setphone]=useState() 
const [address,setaddress]=useState() 
const [postal,setpostal]=useState() 
const [gstin,setgstin]=useState()
const [city,setcity]=useState() 
const [targetKey,setTargetKey]=useState(null)
const [uploadImgUrl,setUploadImgUrl] = useState()
// const token = localStorage.getItem("token");
// const handleUploadtoCloud = async(e)=>{
//   console.log(e.fileList[0])
//   const formData = new FormData();
//   formData.append("file",e.fileList[0]);
//   formData.append("upload_preset", "invoices");
//   axios.post(
//     "https://api.cloudinary.com/v1_1/dlo7urgnj/auto/upload",
//     formData,
//     {
//         headers: {
//             "Content-Type": "multipart/form-data",
//         },
//     }
// )
// .then(res => {
//     const cloudinaryUrl = res.data.secure_url;
//     console.log(res.data.secure_url)
//     setUploadImgUrl(cloudinaryUrl)
// })
// .catch(err=>console.log)

// }


const onFinish = async (values) => {
  const cdata = {image_url:imageUrl,gst_no:gstin,company_name:company_name,first_name:first_name,last_name:last_name,country:country,email:email,phone:phone,postal:postal,address:address,city:city}
  console.log(cdata)
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/clients/create-client`, {
      method: 'POST',
      headers: {
        "Content-Type":"application/json",
        "Authorization":`Bearer ${tokenforaccess}`,
        // "authorization": `Bearer ${token}`
      },
      body: JSON.stringify(cdata)
    });

    console.log(response);
    
    if (response.ok) {
      message.success('Client added successfully!');
      form.resetFields(); // Clear the form after successful submission
    } else {
      message.error('Failed to add client.');
    }}
   catch (error) {
    console.error('Error submitting form:', error);
    message.error('An error occurred while adding the client.');
  }
};




  const navigate=useNavigate()

  const [invoiceDisplay,setinvoiceDisplay]=useState(true)
  const [clientDisplay,setclientDisplay]=useState(false)
  const [clientList,setclientList]=useState(false)
  const [addClient,setaddClient]=useState(false)
  const [editClient,seteditClient]=useState(false)
  const [editIndex,seteditIndex]=useState()
  const [generateInvoice,setgenerateInvoice]=useState(false)
  
  const changeState = (e) => {
    const temp = parseInt(e.key);
    if (temp === 1) {
      setinvoiceDisplay(true);
      setclientDisplay(false);
      setclientList(false);
      setaddClient(false);
      seteditClient(false);
      setgenerateInvoice(false);
    } else if (temp === 2) {
      setinvoiceDisplay(false);
      setclientDisplay(true);
      setclientList(false);
      setaddClient(false);
      seteditClient(false);
      setgenerateInvoice(false);
    }
   else if (temp === 3) {
    setinvoiceDisplay(false);
    setclientDisplay(false);
    setclientList(false);
    setaddClient(false);
    seteditClient(false);
    setgenerateInvoice(true);
  }
  };
  // if (!client) return <p>Loading...</p>;
  const [imageUrl, setImageUrl] = useState(null);
  const [fileList, setFileList] = useState([]);

  const handleUploadToCloudinary = async ({ file }) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'invoices'); // replace with your Cloudinary upload preset

    try {
      const res = await axios.post(
        'https://api.cloudinary.com/v1_1/drqiw6wyl/auto/upload', // replace with your Cloudinary API URL
        formData
      );
      const url = res.data.secure_url;
      setImageUrl(url);
      message.success('Image uploaded successfully!');
      console.log(imageUrl);
    } catch (err) {
      console.error(err);
      message.error('Failed to upload image.');
    }
  };

function formatDateToDDMMYYYY(dateTime) {
  // Ensure dateTime is a valid Date object or string
  const date = new Date(dateTime);
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date format');
  }


  const day = String(date.getDate()).padStart(2, '0');   const month = String(date.getMonth() + 1).padStart(2, '0');  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}


const onChange = (value) => {
  const selectedValue = Array.isArray(value) ? value[0] : value;
  setgenerateInvoiceid(selectedValue)
  console.log(selectedValue);
  const cli = clients.find(client => client.client_id === selectedValue);
  if (cli) {
      console.log('Found Client:', cli);
      setSelectedClient(cli);
  } else {
      console.log('Client not found for the given client_id.');
      setSelectedClient(null); // Optionally reset the state if no client is found
  }
  setSelectedClient(cli);
  console.log(cli);
  console.log(selectedClient);
  
};
useEffect(() => {
  console.log(selectedClient); // This will show the updated value of selectedClient
}, [selectedClient]);

const [filteredInvoices, setFilteredInvoices] = useState(allInvoices);
const [filteredClients,setFilteredClients]=useState(clients)

useEffect(()=>{
  setFilteredClients(clients)
},[clients])

useEffect(() => {
  setFilteredInvoices(allInvoices); // Initialize with all invoices
}, [allInvoices]);


const onSearch = (value) => {
  console.log('Search Query:', value);
  const filteredData = allInvoices.filter((invoice) =>
    invoice.client_name.toLowerCase().includes(value.toLowerCase())
  );
  console.log('Filtered Data:', filteredData);
  setFilteredInvoices(filteredData);
};

const onSearchs=(value)=>{
  console.log('Search Query:', value);
  const filteredclient=clients.filter((clie)=>
  clie.first_name.toLowerCase().includes(value.toLowerCase()));
  console.log('Filtered Client Data:', filteredclient);

  setFilteredClients(filteredclient)
}



const onChanged = ({ fileList: newFileList }) => {
  setFileList(newFileList);
};




const onPreview = async (file) => {
  let src = file.url;
  if (!src) {
    src = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file.originFileObj);
      reader.onload = () => resolve(reader.result);
    });
  }
  const image = new Image();
  image.src = src;
  const imgWindow = window.open(src);
  imgWindow?.document.write(image.outerHTML);
};







  
  return (
    <div style={{display:"flex",backgroundColor:"rgb(232, 232, 232)",height:"100vh"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",flexDirection:"column",height:"100vh",backgroundColor:"white",boxShadow:"0 0 10px grey"}}>
        <Menu style={{paddingTop: "20px",borderRadius:"5px",width:"15vw"}}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="light"
          items={items}
          onClick={(e)=>changeState(e)}
        />
      <Button style={{marginBottom:"20px",height:"30px",width:"9vw"}} type="primary" icon={<LogoutOutlined />} onClick={() => { localStorage.removeItem("token");navigate('/');}}>
      Sign Out</Button>
      </div >
    {/* Invoices */}
    {invoiceDisplay &&
    <div style={{ paddingLeft: "10px", padding: "30px", fontSize: "20px", width: "85%" }}>
    <div style={{ display: "flex" }}>
      <p>Recent Invoices</p>
    </div>
    <div style={{width:"80vw",padding:"20px 0px"}} className="recent-invoices">
      <Row  style={{ width: "100vw", marginTop: "20px" ,display:"flex", justifyContent:"space-evenly"}}>
        {recentInvoices?.slice(-4).map(invoice => (
          <Col  span={5} key={invoice.id}>
            <Card className="invoice-card" style={{ boxShadow:"0 0 10px rgb(199, 192, 192)"}}>
              {/* <div className="invoice-card-logo">GO</div> */}
              {/* <div className="invoice-card-amount">Payable Amount: {invoice.total}</div> */}
              {/* <div>Payable Amount: {invoice.total}</div> */}
              <div style={{display:"flex", justifyContent:"center"}}><h4 style={{margin:"0px"}}> Invoice ID : </h4>&nbsp; {invoice.invoice_id}</div>
              <div style={{display:"flex", justifyContent:"center"}}><h4 style={{margin:"0px"}}> Client Name: </h4>&nbsp; {invoice.client_name}</div>
              <div style={{display:"flex", justifyContent:"center"}}><h4 style={{margin:"0px"}}> Payable Amount: </h4>&nbsp; {invoice.payable_amount}</div>
              <div style={{display:"flex", justifyContent:"center"}}><h4 style={{margin:"0px"}}> Issue Date: </h4>&nbsp; {formatDateToDDMMYYYY(invoice.date_of_invoice_generation)}</div>
              <div className="hover-line"></div>
              <div className="hover-text"><a href={invoice.invoice_link} target="_blank"> View Invoice </a></div>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
    {/* <div style={{ width: "80vw", padding: "20px 0px" }} className="recent-invoices">
  <Row
    style={{ width: "100vw", marginTop: "20px" }}
    justify="space-between"
    gutter={[16, 16]} 
  >
    {recentInvoices?.slice(-4).map(invoice => (
      <Col span={5} key={invoice.id}>
        <Card className="invoice-card">
          <div>Payable Amount: {invoice.total}</div>
          <div>Invoice: {invoice.invoice_id}</div>
          <div>Customer: {invoice.client_name}</div>
          <div>Payable Amount: {invoice.payable_amount}</div>
          <div>Issue Date: {invoice.date_of_invoice_generation}</div>
        </Card>
      </Col>
    ))}
  </Row>
</div> */}

    <hr />
    <div>
      <p style={{ fontSize: "30px" }}>All invoices</p>
    </div>
    <div style={{width:"80vw",padding:"20px 0px"}} className="ctn-body">
      <div style={{marginLeft:"20px auto",width:"80vw",overflow:"scroll",height:"42vh"}} className="all-invoices">
        <div className="filters">
          <Search placeholder="Search" onSearch={onSearch} style={{ width: 200, marginLeft:"20px" }} />
          {/* <RangePicker placeholder={['Start Issue Date', 'End Issue Date']} /> */}
          {/* <Button type="default" style={{ marginLeft: 16 }}>Reset</Button> */}
        </div>
        <Table columns={columns} dataSource={filteredInvoices} pagination={true} style={{ marginTop: 16 }} />
      </div>
    </div>
    </div>
    }
    {/* Client */}
    {clientDisplay &&
    <div style={{padding:"30px", width:"73%"}}>
      <div style={{display:"flex",justifyContent:"space-between"}}>
        <p style={{fontSize:"30px"}}>Clients</p>
        <div style={{display:"flex"}}>
          <Search
              placeholder="input search text"
              onSearch={onSearchs}
              style={{
                width: 200,
              }}
          />
          <Button style={{marginLeft:"10px"}}  onClick={()=>{
            setaddClient(true)
            setclientDisplay(false)
            setgenerateInvoice(false)
          }} type="primary">+ Add Client</Button>
        </div>
      </div>
      <div style={{display:"flex",justifyContent:"space-between",width:"100%"}}>
        {/* 1 */}
        <div style={{display:"flex", width:"100%",justifyContent:"space-evenly",flexWrap:"wrap"}}>
      {filteredClients.map((client,index) => (
        <button
          key={client.id}
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            backgroundColor: "white",
            alignItems: "center",
            marginTop: "20px",
            borderRadius: "9px",
            border: "0px solid grey",
            height: "15vh",
            width: "40vh",
            cursor: "pointer",
            transition: "transform 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease",
            background: "white"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
            e.currentTarget.style.backgroundColor = "#f0f0f0";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "none";
            e.currentTarget.style.backgroundColor = "white";
          }}
          onClick={() => {
            // loadClientData(client.id);
            settempvalue(index)
            setTargetKey(client.client_id);
            console.log(client)
            setEditClientDet(client)
            // console.log(client.client_id);
            fetchClientInvoices(client.client_id);
            console.log(client.client_id);
            
            // Handle the button click logic here
            setclientDisplay(false);
            setclientList(true);
          }}
        >
          <img
            style={{ borderRadius: "50px" }}
            height={"50vh"}
            width={"50vw"}
            src={client.image_url || {ClientImg}} // Use client image or a default image
            alt={`${client.name}'s profile`}
          />
          <div style={{ marginLeft: "5px" }}>
            <h3 style={{ padding: "0px", margin: "0px" }}>{client.first_name}</h3>
            <p>Company Name: {client.company_name}</p>
            <p>Email: {client.email}</p>
            <p>Country: {client.country}</p>
            {/* <p>{index}</p> */}
          </div>
        </button>
      ))}
    </div>
    </div>
    </div>
    }
    {/* List of Clients */}
    {clientList && 
    // ()=>console.log(targetkey)
    <div style={{padding:"30px"}}>
      {/* 1 */}
      <div>
      <div style={{ display: "flex", width: "80vw", justifyContent: "space-between", marginBottom: "20px" }}>
      {clients.filter((client)=>client.client_id===targetKey).map((client,index) => (
        <div key={client.id} style={{ display: "flex", backgroundColor: "white", justifyContent: "space-evenly", alignItems: "center", borderRadius: "10px", border: "0px solid grey", height: "15vh", width: "80vw" }}>
          <div style={{ display: "flex", marginLeft: "-5%", width: "35vw", alignItems: "center" }}>
            <img style={{ borderRadius: "50px" }} height={"70vh"} width={"70vw"} src={client.image_url || {ClientImg}} alt={`${client.name}'s profile`} />
            <div style={{ marginLeft: "10px", textAlign: "left", width: "20vw" }}>
              <h3 style={{ padding: "0px", margin: "0px" }}>{client.company_name}</h3>
              <p style={{fontSize:"15px"}}>Client name : {client.first_name}</p>
              <p style={{fontSize:"15px"}}>E-mail : {client.email}</p>
              <p style={{fontSize:"15px"}}>Country : {client.country}</p>
              {/* <p>{index+1}</p> */}
            </div>
          </div>
          <div style={{ margin: "20px", width: "10vw", display: "flex", justifyContent: "space-between" }}>
            <Button style={{margin:"0px 10px"}} type='primary' onClick={() => { seteditClient(true); setclientList(false); }}>Edit</Button>
            {console.log(editClientDet)}
            <Popconfirm
          title="Are you sure to delete this invoice?"
          onConfirm={() => handleDeleteClient(targetKey)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="primary" danger>
            Delete
          </Button>
        </Popconfirm>
            {/* <Button type="primary" danger onClick={() => handleDeleteClient(targetKey)}>Delete</Button> */}
          </div>
        </div>
      ))}
      </div>
      <br />
      <hr />
      <div style={{display:"flex"}}>
        <p>Invoice</p>
        <Button style={{ marginLeft: "10px" }} onClick={() => navigate('/new',{state:{clientid:editClientDet.client_id,clientcompanyname:editClientDet.company_name,clientaddress:editClientDet.address,clientname:editClientDet.first_name,clientlogo:editClientDet.image_url,clientgstin:editClientDet.gst_no,token:tokenforaccess}})} type="primary">+ New Invoice</Button>

      </div>
      <Table columns={columns} dataSource={clientInvoices} pagination={false} style={{ marginTop: 16 }} />
    </div>
      
    </div>
    }
    {addClient &&
    <Card
    title="Add Client"
    bordered={true}
    style={{ margin:"60px" ,height: '80vh',width:"70%",border:'0.1px solid grey' }}
  >
    <Form
      form={form}
      name="edit-client"
      onFinish={onFinish}
      layout="vertical"
      initialValues={{
        country: 'select',
      }}
    >
      <Row gutter={16}>
      <Col span={5}>
        {/* <Form.Item
          name="image_url"
          // label="Client Logo"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload
            name="files"
            listType="picture-card"
            style={{ width: 150, height: 100 }}
            customRequest={handleUploadToCloudinary} // Use customRequest for manual upload handling


          >
            <div>
              <InboxOutlined style={{ fontSize: '24px' }} />
              <p style={{ marginTop: 8 }}>Upload</p>
            </div>
          {fileList.length < 1 && '+ Upload'}

          </Upload>
        </Form.Item> */}

          
<Upload
        className='ant-no-border'
        style={{ border: 'none', width:"50%",height:"100%",boxShadow: 'none', borderRadius: '8px' }} // Inline style to remove border and make the image square
        listType="picture-card"
        fileList={fileList}
        customRequest={handleUploadToCloudinary}
        onChange={onChanged}
        onPreview={onPreview}
      >
        {fileList.length < 1 && '+ Upload'}
      </Upload>


      </Col>
        <Col span={16}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="company_name"
                label="Company name"
                rules={[{ required: true, message: 'Please input the company name!' }]}
              >
                 <Input onChange={(e)=>setcompany_name(e.target.value)} placeholder="Enter company name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="first_name"
                label="First name"
                rules={[{ required: true, message: 'Please input the first name!' }]}

              >
                <Input onChange={(e)=>setfirst_name(e.target.value)} placeholder="Enter first name" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="last_name"
                label="Last name"
              >
                <Input onChange={(e)=>setlast_name(e.target.value)} placeholder="Enter last name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email address"
                rules={[{ required: true, type: 'email', message: 'Please enter a valid email address!' }]}
              >
                <Input onChange={(e)=>setemail(e.target.value)} placeholder="Enter email address" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="country"
                label="Country"
              >
                <Select onChange={(e)=>setcountry(e)}>
                <Option value="select">--select--</Option>
                  <Option value="India">India</Option>
                  <Option value="England">England</Option>
                  <Option value="USA">USA</Option>
                </Select>
                </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="phone"
                label="Phone number"
              >
                <Input onChange={(e)=>setphone(e.target.value)} type="number" placeholder="Enter phone number" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={14}>
            <Col span={12}>
              <Form.Item
                name="address"
                label="Address line "
              >
                <Input onChange={(e)=>setaddress(e.target.value)} placeholder="Enter address line 1" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="gstin"
                label="GSTIN"
                rules={[{ required: true, message: 'Please enter GSTIN!' }]}
              >
                
                <Input onChange={(e)=>setgstin(e.target.value)}  placeholder="Enter GSTIN" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="postal"
                label="Postal code"
              >
                
                <Input onChange={(e)=>setpostal(e.target.value)} type="number" placeholder="Enter postal code" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="city"
                label="City"
              >
                <Input onChange={(e)=>setcity(e.target.value)} placeholder="Enter city" />
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>
      <Form.Item style={{ textAlign: 'center', marginTop: '20px' }}>
      <Button type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  </Card>
     }
     {editClient &&
     <div>
      {console.log(editClientDet)}
    {/* { editClientDet(cli => ( */}
      <Card
      
      title="Edit Client"
      bordered={true}
      style={{ margin: "58px", alignItems:"center",width: "150%", border: '0.1px solid grey' }}
      >
    <Form
      form={clientForm}
      
      name="client-edit-form"
      onFinish={handleFormSubmit}
      layout="vertical"
      initialValues={{
        // clientLogo:editClientDet?.image_url,
        country: editClientDet?.country,
        companyName: editClientDet?.company_name,
        firstName: editClientDet?.first_name,
        lastName: editClientDet?.last_name,
        email: editClientDet?.email,
        gstin:editClientDet?.gst_no,
        phoneNumber: editClientDet?.phone,
        addressLine1: editClientDet?.address,
        postalCode: editClientDet?.postal,
        city: editClientDet?.city,
      }}
      // {...()=>{setcompany_name(editClientDet.company_name);
      //   setfirst_name(editClientDet.first_name);
      //   setlast_name(editClientDet.last_name);
      //   setemail(editClientDet.email);
      //   setphone(editClientDet.phone);
      //   setaddress(editClientDet.address);
      //   setpostal(editClientDet.postal);
      //   setcity(editClientDet.city);
      // }}
    >
      <Row gutter={16}>
        {/* <Col span={5}> */}
          {/* <Form.Item
            name="clientLogo"
            label="Client Logo"
            valuePropName="fileList"
            getValueFromEvent={transformFile}
          > */}
            {/* <Upload.Dragger
            name="files"
            listType="picture-card"
            style={{ width: 150, height: 100 }}
            customRequest={handleUploadToCloudinary} // Use customRequest for manual upload handling
          >
            <div>
              <InboxOutlined style={{ fontSize: '24px' }} />
              <p style={{ marginTop: 8 }}>Upload</p>
            </div>
          </Upload.Dragger> */}
          <div style={{display:"flex",flexDirection:"column"}}>
{/* <Upload
        className='ant-no-border'
        style={{ border: 'none', width:"50%",height:"100%",boxShadow: 'none', borderRadius: '8px' }} // Inline style to remove border and make the image square
        listType="picture-card"
        fileList={fileList}
        customRequest={handleUploadToCloudinary}
        onChange={onChanged}
        onPreview={onPreview}
      >
        {fileList.length < 1 && '+ Upload'}
      </Upload> */}
      <img style={{height:"110px",width:"110px",marginRight:"10px"}} src={editClientDet.image_url} alt="" />
      </div>





          {/* </Form.Item>
        </Col> */}
        <Col span={16}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="companyName"
                label="Company name"
                rules={[{ required: true, message: 'Please input the company name!' }]}
              >
                <Input onChange={(e)=>{setcompany_name(e.target.value)}} placeholder="Enter Company Name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="firstName"
                label="First name"
                rules={[{ required: true, message: 'Please input the first name!' }]}
              >
                <Input onChange={(e)=>setfirst_name(e.target.value)} placeholder="Enter First Name" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="lastName"
                label="Last name"
              >
                <Input onChange={(e)=>setlast_name(e.target.value)} placeholder="Enter Last Name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email address"
                rules={[{ required: true, type: 'email', message: 'Please enter a valid email address!' }]}
              >
                <Input onChange={(e)=>setemail(e.target.value)} placeholder="Enter Email" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="country"
                label="Country"
              >
                <Select onChange={(e)=>setcountry(e)}>
                  <Option value="India">India</Option>
                  <Option value="England">England</Option>
                  <Option value="USA">USA</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="phoneNumber"
                label="Phone number"
              >
                <Input onChange={(e)=>setphone(e.target.value)} type="number" placeholder="Enter Phone Number" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={14}>
            <Col span={12}>
              <Form.Item
                name="addressLine1"
                label="Address line 1"
              >
                <Input onChange={(e)=>setaddress(e.target.value)} placeholder="Enter Address" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="gstin"
                label="GSTIN"
                rules={[{ required: true, message: 'Please enter GSTIN!' }]}
              >
                
                <Input onChange={(e)=>setgstin(e.target.value)}  placeholder="Enter GSTIN" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="postalCode"
                label="Postal code"
              >
                <Input onChange={(e)=>setpostal(e.target.value)} type="number" placeholder="Enter Postal Code" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="city"
                label="City"
              >
                <Input onChange={(e)=>setcity(e.target.value)} placeholder="Enter City" />
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>
      <Form.Item style={{ textAlign: 'center', marginTop: '20px' }}>
        <Button type="primary" htmlType="submit" loading={isLoading}>
          Save
        </Button>
      </Form.Item>
    </Form>
  </Card>
  {/* ))} */}
  </div>
     }
     {generateInvoice && 
     <div style={{width:"100%",height:"80%",display:"flex",justifyContent:"center",flexDirection:"column",alignItems:"center"}} >
      <p style={{fontSize:"150%"}}>Select the Client to Proceed with Invoice Generation</p><br />
     <Cascader dropdownMenuColumnStyle={{ width: '400px' }} style={{height:"50px",width:"400px"}} options={options} onChange={onChange} placeholder="Please select the client you would like to generate Invoice" />
     <br /><Button type='primary' onClick={()=>navigate('/new',{state:{clientid:selectedClient.client_id,clientgstin:selectedClient.gst_no,clientcompanyname:selectedClient.company_name,clientname:selectedClient.first_name,clientaddress:selectedClient.address,clientlogo:selectedClient.image_url,token:tokenforaccess}})}>Generate</Button>
     </div>
     }
    </div>
  );
};
export default Dashboard