import { Form, Input, Row, Col } from 'antd';

function Question({ handleFinish, form }) {
  return (
    <Form form={form} onFinish={handleFinish} style={{ border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
      <Row>
        <Col span={24}>
          <Form.Item rules={[]} label={<span>Question </span>} name="description">
            <Input placeholder="" />
          </Form.Item>
        </Col>
      </Row>
      <Row style={{ marginTop: 10 }}>
        <Col span={11}>
          <Form.Item label={<span>Answer 1</span>} name="answer1">
            <Input placeholder="" />
          </Form.Item>
          <Form.Item label={<span>Answer 3</span>} name="answer3">
            <Input placeholder="" />
          </Form.Item>
        </Col>
        <Col span={11} offset={1}>
          <Form.Item label={<span>Answer 2</span>} name="answer2">
            <Input placeholder="" />
          </Form.Item>
          <Form.Item label={<span>Answer 4</span>} name="answer4">
            <Input placeholder="" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <Form.Item rules={[]} label={<span>Correct Answer(1-4)</span>} name="correct">
            <Input placeholder="" />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

export default Question;
