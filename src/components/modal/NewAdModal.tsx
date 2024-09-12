import React from 'react';
import { Modal, Form, Input, InputNumber } from 'antd';
import { Advertisment } from '@api/types';

interface NewAdModalProps {
  visible: boolean;
  onCreate: (values: Omit<Advertisment, 'id'>) => void;
  onCancel: () => void;
  initialValues?: Omit<Advertisment, 'id'>;
}

const NewAdModal: React.FC<NewAdModalProps> = ({ visible, onCreate, onCancel, initialValues }) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        onCreate(values);
        form.resetFields();
      })
      .catch(errorInfo => {
        console.error('Failed to create advertisement:', errorInfo);
      });
  };

  return (
    <Modal
      title={initialValues ? 'Редактировать объявление' : 'Создать новое объявление'}
      open={visible}
      onOk={handleOk}
      onCancel={onCancel}
      okText={initialValues ? 'Сохранить' : 'Создать'}
      cancelText="Отменить"
    >
      <Form form={form} layout="vertical" initialValues={initialValues}>
        <Form.Item
          label="URL Картинки"
          name="imageUrl"
          rules={[{ required: true, message: 'Пожалуйста, введите URL картинки!' }]}
        >
          <Input placeholder="Введите URL картинки" />
        </Form.Item>

        <Form.Item
          label="Название"
          name="name"
          rules={[{ required: true, message: 'Пожалуйста, введите название!' }]}
        >
          <Input placeholder="Введите название" />
        </Form.Item>

        <Form.Item
          label="Описание"
          name="description"
          rules={[{ required: true, message: 'Пожалуйста, введите описание!' }]}
        >
          <Input.TextArea rows={3} placeholder="Введите описание" />
        </Form.Item>

        <Form.Item
          label="Стоимость"
          name="price"
          rules={[{ required: true, message: 'Пожалуйста, введите стоимость!' }]}
        >
          <InputNumber min={0} placeholder="Введите стоимость" style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NewAdModal;
