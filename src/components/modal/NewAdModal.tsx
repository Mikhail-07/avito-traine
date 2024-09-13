import React from 'react';
import { Modal, Form, Input, InputNumber } from 'antd';
import { Advertisment } from '@api/types';
import { useNotification } from '@hooks/index';

interface NewAdModalProps {
  visible: boolean;
  onCreate: (values: Omit<Advertisment, 'id'>) => void;
  onCancel: () => void;
  initialValues?: Omit<Advertisment, 'id'>;
}

const NewAdModal: React.FC<NewAdModalProps> = ({ visible, onCreate, onCancel, initialValues }) => {
  const [form] = Form.useForm();
  const { showError } = useNotification();

  const handleOk = () => {
    form
      .validateFields()
      .then(values => {
        onCreate(values);
        form.resetFields();
      })
      .catch(showError);
  };

  const formFields = [
    { label: 'URL Картинки', name: 'imageUrl', component: <Input placeholder="Введите URL картинки" /> },
    { label: 'Название', name: 'name', component: <Input placeholder="Введите название" /> },
    { label: 'Описание', name: 'description', component: <Input.TextArea rows={3} placeholder="Введите описание" /> },
    { label: 'Стоимость', name: 'price', component: <InputNumber min={0} placeholder="Введите стоимость" style={{ width: '100%' }} /> }
  ];

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
        {formFields.map(({ label, name, component }) => (
          <Form.Item
            key={name}
            label={label}
            name={name}
            rules={[{ required: true, message: `Пожалуйста, введите ${label.toLowerCase()}!` }]}
          >
            {component}
          </Form.Item>
        ))}
      </Form>
    </Modal>
  );
};

export default NewAdModal;
