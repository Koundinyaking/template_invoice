import { Button, ConfigProvider} from 'antd';
// import { AntDesignOutlined } from '@ant-design/icons';
import { css } from '@emotion/css';
import { useContext } from 'react';
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown, Space,FloatButton } from 'antd';
import Logo from './logo.jpg';
import Bg from './Bg.png'
import One from './bg1img.png'
import Two from './bg2img.png'
import SVG from './backbg.svg'
import { Navigate, useNavigate } from "react-router-dom";

const items = [
    {
      key: '1',
      label: 'Item 1',
    },
    {
      key: '2',
      label: 'Item 2',
    },
    {
      key: '3',
      label: 'Item 3',
    },
  ];
  

const LandingPage = () => {
    const { getPrefixCls } = useContext(ConfigProvider.ConfigContext);
  const rootPrefixCls = getPrefixCls();
  const linearGradientButton = css`
    &.${rootPrefixCls}-btn-primary:not([disabled]):not(.${rootPrefixCls}-btn-dangerous) {
      border-width: 0;

      > span {
        position: relative;
      }

      &::before {
        content: '';
        background: linear-gradient(135deg, #6253e1, #04befe);
        position: absolute;
        inset: 0;
        opacity: 1;
        transition: all 0.3s;
        border-radius: inherit;
      }

      &:hover::before {
        opacity: 0;
      }
    }
  `;
  const navigate=useNavigate()

  return (
    
    <div style={{width:"100vw"}}>
        <div style={{display:"flex",justifyContent:"space-evenly",alignItems:"center"}}>
            <div>
                <img style={{height:"55px",width:"55px",borderRadius:"5px"}} src={Logo} alt="logo" />
            </div>
            <div style={{margin:"20px",width:"60vw",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <Dropdown menu={{items,}}>
                <a onClick={(e) => e.preventDefault()}>
                    <Space >
                        <p style={{color:"black",fontFamily:"sans-serif"}}>Invoice Generator</p>
                            <DownOutlined />
                    </Space>
                </a>
            </Dropdown>
            <Dropdown menu={{items,}}>
                <a onClick={(e) => e.preventDefault()}>
                    <Space >
                        <p style={{color:"black",fontFamily:"sans-serif"}}>Invoice Templates</p>
                            <DownOutlined />
                    </Space>
                </a>
            </Dropdown>
            <Dropdown menu={{items,}}>
                <a onClick={(e) => e.preventDefault()}>
                    <Space >
                        <p style={{color:"black",fontFamily:"sans-serif"}}>Invoicing Guide</p>
                            <DownOutlined />
                    </Space>
                </a>
            </Dropdown>
            <Dropdown menu={{items,}}>
                <a onClick={(e) => e.preventDefault()}>
                    <Space >
                        <p style={{color:"black",fontFamily:"sans-serif"}}>International Payments</p>
                            <DownOutlined />
                    </Space>
                </a>
            </Dropdown>
                <ConfigProvider button={{className: linearGradientButton}}>
                <Button type="primary" size="large" onClick={()=>navigate('/login')}>Sign In</Button>
                </ConfigProvider>
            </div>
        </div>
        <hr />
        <div className='Landing-body'>
                <h1>Online Invoice Generator</h1>
                <p style={{fontSize:"21px",fontWeight:"bold",margin:"20px"}}>Create & download invoices for free</p>
                <button onClick={()=>navigate('/dashboard')}>Create Free Invoice Now</button>
                <div className='svgimg'>
                    {/* <img style={{width:"100%"}} src={SVG} alt="" /> */}
                    <img className='bgimg' src={Bg} alt="" />
                </div>
                
                <button onClick={()=>navigate('/dashboard')}>Create Free Invoice Now</button>
                <div style={{display:"flex",width:"70vw",justifyContent:"space-between",alignItems:"center",marginTop:"50px"}}>
                    <div style={{display:"flex",flexDirection:"column", width:"30vw"}}>
                        <h2>Brand your invoices with your customized business logo for free</h2>
                        <p style={{fontWeight:"lighter",fontSize:"20px"}}>Each invoice created with our online invoice maker can be customized to the specific client you’re sending it to. You can choose to add your company or business logo, add sender info (or set default sender in the settings), add client info, add as many items as you wish such as products with fixed prices & services with hourly rates, add taxes and to make sure to get paid on time add invoice payment terms such as banking details or payment link and due date. The clean, user-friendly interface of the invoice generator also lets you add new clients and manage them easily. Contact, company & payment details and customized invoice templates can be saved for recurring invoices.</p>
                    </div>
                    <div>
                        <img src={One} alt="" />
                    </div>
                </div>

                <div style={{display:"flex",width:"70vw",justifyContent:"space-between",alignItems:"center",marginTop:"50px"}}>
                    <div>
                        <img src={Two} alt="" />
                    </div>
                    <div style={{display:"flex",flexDirection:"column", width:"30vw"}}>
                        <h2>Generate unlimited invoices & PDF download</h2>
                        <p style={{fontWeight:"lighter",fontSize:"20px"}}>Using our online invoice maker, you can generate an unlimited number of invoices and download them as PDF without having to pay extra. Free Invoice Builder will help you to make invoices in the correct format with all essential elements. Plus, you can easily help you save, track and manage all your invoices & contacts, so you’ll never lose or misplace an invoice and clients business details.</p>
                    </div>
                </div>
                <div style={{display:"flex",flexDirection:"column",width:"45vw",marginTop:"50px"}}>
                    <h2>Why use Free Invoice Builder</h2>
                    <p  style={{fontWeight:"lighter",fontSize:"20px"}}>Sending invoices to clients is a large part of any business – in order to keep a business running, payments from clients must be received on time. However, the process of producing invoices can often be quite tedious, which is why many business owners defer it to the last possible minute. But now, with new digital tools and technologies available, all that has changed: producing invoices and sending them to clients has never been easier.

Free Invoice Builder is an online invoice generator – an innovative business tool you can use for creating invoices online without any hassle. It allows businesses to produce invoices using a ready- made template, where all that needs to be done is inserting the client’s details, the items for payment, taxes (if necessary) and the total amount – then sending the invoice to the client online.

With this free invoice maker, you can build great-looking PDF invoices from scratch on your web browser and send them to clients in seconds – which saves time for both you and your clients.</p>
                </div>
                <div style={{display:"flex",
                    flexDirection:"column",
                    alignItems:"center",
                    margin:"30px 0px",}}>
                    <p>Contact Us</p>
                    <a href="#">contact@vtsenterprises.com</a>
                    <button onClick={()=>navigate('/dashboard')}>Create Free Invoice Now</button>
                </div>
                <hr style={{width:"100%"}}/>
                <div style={{
                    marginBottom:"30px",
                    marginTop:"20px",
                    width:"90%",
                    display:"flex",
                    justifyContent:"space-evenly",
                }}>
                    <p>Copyright 2023,All Rights Reserved</p>
                    <p>Terms and Conditons</p>
                    <p>Privacy Policy</p>
                    <p>Blank Invoice</p>
                    <p>Invoice Templates</p>
                    <p>Open Account</p>
                </div>
        </div>
        <FloatButton.BackTop />
    </div>
  )
}

export default LandingPage