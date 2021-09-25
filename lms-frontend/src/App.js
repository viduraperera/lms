import React, { useState } from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import { useHistory } from 'react-router';

import Login from './Components/Auth/Login'
import NotFound from './Components/Common/NotFound';
import modulePage from "./Pages/modulePage";
import Register from './Components/Auth/Register';
import CreateModuleForm from "./Components/module/CreateModuleForm";
import Users from './Components/Users/Users';
import UserProfile from './Components/Users/UserProfile'
import EditUser from './Components/Users/EditUser';
import SingleModule from "./Components/module/SingleModule";
import AddNotice from './Components/Notices/AddNotice';
import NoticeAdmin from './Components/Notices/NoticeAdmin';
import EditNotice from './Components/Notices/EditNotice';
import EditSingleModule from "./Components/module/EditModule";
import AddEditLecture from './Components/Lectures/AddEditLectures'
import Lectures from './Components/Lectures/Lectures';
import AddEvent from './Components/Events/AddEvent';
import EventAdmin from './Components/Events/EventAdmin';
import EditEvent from './Components/Events/EditEvent';
import AddEditResult from './Components/Results/AddEditResult';
import AddReply from './Components/Forum/AddReply';

//import AddEditTimetable from './Components/Timetables/AddEditTimetable';
import Timetables from './Components/Timetables/Timetables';

import CreateDiscussion from './Components/Forum/CreateDiscussion';
import ViewDiscussion from './Components/Forum/ViewDiscussion';
import ViewForum from './Components/Forum/ViewForum';

import 'antd/dist/antd.css';
import './index.css';
import { Layout, Menu } from 'antd';
import Logo from './Images/logoooo.png'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  ReadOutlined,
  NotificationOutlined,
  CoffeeOutlined,
  FileExcelOutlined,
  LineChartOutlined,
  CommentOutlined,
} from '@ant-design/icons';
import Results from './Components/Results/Results';
import ViewResult from './Components/Results/ViewResult';

const { Header, Sider, Content } = Layout;

function App() {
  const history = useHistory();
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  const logo = {
    width: 60,
    height: 45,
    marginTop: 10,
    marginBottom: 10
  }

  const headerBar = {
    backgroundColor: '#278ea5',
    display: 'flex'
  }

  const headerText = {
    color: 'white',
    fontSize: 15,
    fontWeight: 'bold',
    fontFamily: 'Besley',
    padding: 0,
    margin: 0
  }

  const logoDiv = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'

  }

  return (
    <div>
      <BrowserRouter>
        <ToastProvider>
        <Layout>
          <Sider trigger={null} collapsible collapsed={collapsed}
          style={{
            overflow: 'none',
            height: '100vh',
            position: 'fixed',
            left: 0,
          }}>
            <div className="logo" style={logoDiv}>
              <Link to="/">
                <img src={Logo} style={logo} alt="Logo" />
              </Link>
              {/* <p style={headerText}>Institute of Science and Technology</p> */}
            </div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
              <Menu.Item key="1" icon={<UserOutlined />}>
                <Link to="/users"></Link>
                  User Module
              </Menu.Item>
              <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                <Link to="/modulePage"></Link>
                Course Module
              </Menu.Item>
              <Menu.Item key="3" icon={<ReadOutlined />}>
              <Link to="/lectures"></Link>
                Lecture Module
              </Menu.Item>
              <Menu.Item key="4" icon={<NotificationOutlined />}>
                Notice Module
                <Link to="/noticeAdmin"></Link>
              </Menu.Item>
              <Menu.Item key="5" icon={<CoffeeOutlined /> }>
                Event Module
                <Link to="/eventAdmin"></Link>
              </Menu.Item>
              <Menu.Item key="6" icon={<LineChartOutlined /> }>
                Result Module
                <Link to="/results"></Link>
              </Menu.Item>
              <Menu.Item key="7">
                Timetable Module
                <Link to="/results"></Link>
              </Menu.Item>
              <Menu.Item key="8" icon={<CommentOutlined />}>
                Forum Module
                <Link to="/viewForum"></Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout" style={{marginLeft: collapsed ? 75 : 200}}>
            <Header className="site-layout-background" style={{ padding: 0 }}>
              <div className="row">
                <div className="col-1" style={headerBar}>
                  {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                    className: 'trigger',
                    onClick: toggle,
                  })}
                </div>
                <div className="col" style={headerBar}>
                  {/* <img src={Logo} style={logo} alt="Logo" /> */}
                  <p style={headerText}>Institute of Science and Technology</p>
                </div>
              </div>
            </Header>
            <Content
              className="site-layout-background"
              style={{ margin: '24px 16px 0', overflow: 'initial' }}
            >
              <Switch>
                <Route path={'/'} exact component={Login}></Route>
                <Route path={'/users'} exact component={Users}></Route>
                <Route path={'/register'} exact component={Register} />
                <Route path={'/updateUser/:id'} component={EditUser} />
                <Route path={'/profile/:id'} component={UserProfile} />
                <Route path={'/login'} exact component={Login} />
                <Route path={'/modulePage'} exact component={modulePage}></Route>
                <Route path={'/createModule'} exact component={CreateModuleForm}></Route>
                <Route path={'/singleModulePage'} exact component={SingleModule}></Route>
                <Route path={'/addNoticeForm'} exact component={AddNotice}></Route>
                <Route path={'/noticeAdmin'} exact component={NoticeAdmin}></Route>
                <Route path={'/editNotice/:id'} component={EditNotice}></Route>

                <Route path={'/lecture/add'} exact component={AddEditLecture} />
                <Route path={'/lecture/edit/:id'} component={AddEditLecture} />
                <Route path={'/lectures'} exact component={Lectures} />

                <Route path={'/modulePage'} exact component={modulePage}/>
                <Route path={'/createModule'} exact component={CreateModuleForm}/>
                <Route path={'/viewModule/:id'}  component={SingleModule}/>
                <Route path={'/editModule/:id'}  component={EditSingleModule}/>

                <Route path={'/addEvent'} exact component={AddEvent}></Route>
                <Route path={'/eventAdmin'} exact component={EventAdmin}></Route>
                <Route path={'/editEvent/:id'} component={EditEvent}></Route>
                <Route path={'/results'} exact component={Results}></Route>
                <Route path={'/results/add'} exact component={AddEditResult}></Route>
                <Route path={'/results/view/:id'} component={ViewResult}></Route>
                <Route path={'/results/edit/:id'} component={AddEditResult}></Route>

                {/* <Route path={'/timetable/add'} exact component={AddEditTimetable} /> */}
                {/* <Route path={'/timetable/edit/:id'} component={AddEditTimetable} /> */}
                <Route path={'/timetables'} exact component={Timetables} />

                <Route path={'/createDiscussion'} exact component={CreateDiscussion}></Route>
                <Route path={'/viewDiscussion/:id'} component={ViewDiscussion}></Route> 
                <Route path={'/viewForum'} exact component={ViewForum}></Route>
                <Route path={'/addReply'} exact component={AddReply}></Route>

                <Route path="" component={NotFound} />
              </Switch>
            </Content>
          </Layout>
        </Layout>
          {/* <Footer/> */}
        </ToastProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
