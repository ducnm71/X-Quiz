import React from 'react';
import { Form, Input, DatePicker, Layout, Typography, Divider, Row, Col, List } from 'antd';
import './index.css';

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const contactInfo = [
  'X Quizz',
  '33 Farlane Street +123 655 655',
  'Keilor East +123 755 755',
  'VIC 3033, Australia xquizz@gmail.com',
];

const ContactPage = () => {
  return (
    <React.Fragment>
      <Layout
        style={{
          padding: '50px 250px',
          height: 'max-content',
        }}
      >
        <Header
          style={{
            backgroundColor: '#f5f5f5',
            height: 'fit-content',
            padding: 0,
          }}
        >
          <Title level={3}>Visit Us</Title>
          <Divider></Divider>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29794.073225290853!2d105.77822817431638!3d21.0223142!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab9f10111ae7%3A0x9112347ed343cc56!2sMindX%20Technology%20School%20(Th%C3%A0nh%20C%C3%B4ng)!5e0!3m2!1svi!2s!4v1687338153881!5m2!1svi!2s"
            width="100%"
            height="300"
            style={{
              border: 'none',
            }}
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            className="contact-map"
          ></iframe>
        </Header>
        <Layout>
          <Row>
            <Col
              style={{
                paddingRight: 40,
                boxSizing: 'border-box',
              }}
              span={16}
            >
              <Content>
                <Title level={3}>Online Contact Form</Title>
                <Divider></Divider>
                <Form layout="vertical">
                  <Input.Group>
                    <Row gutter={12}>
                      <Col span={12}>
                        <Form.Item label="First Name">
                          <Input className="contact-input" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="Last Name">
                          <Input className="contact-input" />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Input.Group>

                  <Input.Group>
                    <Row gutter={12}>
                      <Col span={12}>
                        <Form.Item label="Date of Birth">
                          <DatePicker style={{ width: '100%' }} className="contact-input" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="Social Security Number">
                          <Input className="contact-input" />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Input.Group>

                  <Input.Group>
                    <Row gutter={12}>
                      <Col span={12}>
                        <Form.Item label="Phone Number">
                          <Input className="contact-input" />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        <Form.Item label="Email">
                          <Input className="contact-input" />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Input.Group>

                  <Input.Group>
                    <Form.Item label="Your Messages">
                      <Input.TextArea className="contact-input" />
                    </Form.Item>
                  </Input.Group>
                </Form>
              </Content>
            </Col>

            <Col span={8}>
              <div className="contactSidebar-container">
                <Title level={3}>X Quizz</Title>

                <Text className="sentence">
                  Your feedback is always valuable to us as we continuously strive to improve the user experience and
                  deliver the best games possible.
                </Text>

                <List
                  size="small"
                  className="contactSidebar-info"
                  dataSource={contactInfo}
                  renderItem={(item) => <List.Item>{item}</List.Item>}
                />

                <ul className="contactSidebar-social">
                  <li className="socialInfo-container">
                    <i class="fa-solid fa-square-phone"></i>{' '}
                    <span>
                      Phone: <b>1-800-643-4300</b>
                    </span>
                  </li>
                  <li className="socialInfo-container">
                    <i className="fa-solid fa-square-envelope"></i> <span className="social-link">xquizz@mail.com</span>
                  </li>
                  <li className="socialInfo-container">
                    <i className="fa-brands fa-square-facebook"></i>{' '}
                    <span className="social-link">facebook.com/xquizz</span>
                  </li>
                  <li className="socialInfo-container">
                    <i className="fa-brands fa-square-twitter"></i>{' '}
                    <span className="social-link">twitter.com/xquizz</span>
                  </li>
                  <li className="socialInfo-container">
                    <i className="fa-brands fa-square-google-plus"></i>{' '}
                    <span className="social-link">google.com/xquizz</span>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </Layout>
      </Layout>
    </React.Fragment>
  );
};

export default ContactPage;
