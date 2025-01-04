import React, { useContext } from 'react'
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import { Helmet } from 'react-helmet-async';
import AccountInformation from './AccountInformation';
import ChangePassword from './ChangePassword';
import { UserContext } from '../../components/Contexts/UserContext';
import styles from './Profile.module.scss';

export default function Profile() {
    const appName = import.meta.env.VITE_REACT_APP_NAME;
    const { userInfo, loading } = useContext(UserContext);

    return (
        <div className={`container`}>
            <Helmet>
                <title>Profile - {appName}</title>
            </Helmet>
            <Tab.Container id="left-tabs" defaultActiveKey="first">
                <Row>
                    <div className={`text-center mt-5`}>
                        <h3>Trang tài khoản</h3>
                        
                    </div>
                    <Col sm={3} className={`mt-5`}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="first" className={`${styles.linkTabs}`}>Thông tin tài khoản</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second" className={`${styles.linkTabs}`}>Đổi mật khẩu</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>
                            <Tab.Pane eventKey="first">
                                <AccountInformation />
                            </Tab.Pane>
                            <Tab.Pane eventKey="second">
                                <ChangePassword />
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </div>
    )
}
