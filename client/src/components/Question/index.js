import { Form, Input, Row, Col, Button } from 'antd';

function Question({ index, handleDeleteQuestion }) {
  return (
    <div style={{ width: '80%', border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
      <Row>
        <Col span={17}>
          <Form.Item rules={[]} label={<span>Question {index}</span>} name="name">
            <Input placeholder="" />
          </Form.Item>
        </Col>
      </Row>
      <Row style={{ marginTop: 10 }}>
        <Col span={8}>
          <Form.Item label={<span>Answer 1</span>} name="name">
            <Input placeholder="" />
          </Form.Item>
          <Form.Item label={<span>Answer 3</span>} name="name">
            <Input placeholder="" />
          </Form.Item>
        </Col>
        <Col span={8} offset={1}>
          <Form.Item label={<span>Answer 2</span>} name="name">
            <Input placeholder="" />
          </Form.Item>
          <Form.Item label={<span>Answer 4</span>} name="name">
            <Input placeholder="" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <Form.Item rules={[]} label={<span>Correct Answer(1-4)</span>} name="name">
            <Input placeholder="" />
          </Form.Item>
        </Col>
        <Col span={2} offset={9}>
          <Button onClick={() => handleDeleteQuestion(index)}>Delete</Button>
        </Col>
      </Row>
    </div>
  );
}

export default Question;
