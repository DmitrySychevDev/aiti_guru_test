import { useMutation } from '@tanstack/react-query';
import { Modal } from '@/shared/ui/Modal';
import { Form, FormItem, useForm } from '@/shared/ui/Form';
import { Input } from '@/shared/ui/Input';
import { notification } from '@/shared/ui/Notification';
import { productApi } from '@/entities/product';

interface AddProductModalProps {
  open: boolean;
  onClose: () => void;
}

interface AddProductFormValues {
  title: string;
  price: string;
  brand: string;
  sku: string;
}

export function AddProductModal({ open, onClose }: AddProductModalProps) {
  const [form] = useForm();
  const [messageApi, contextHolder] = notification.useMessage();

  const mutation = useMutation({
    mutationFn: productApi.addProduct,
    onSuccess: () => {
      messageApi.success('Товар успешно добавлен');
      form.resetFields();
      onClose();
    },
    onError: () => {
      messageApi.error('Не удалось добавить товар');
    },
  });

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      mutation.mutate({
        title: values.title,
        price: Number(values.price),
        brand: values.brand,
        sku: values.sku,
      });
    } catch {
      // validation failed
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <>
      {contextHolder}
      <Modal
        title="Добавить товар"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Добавить"
        cancelText="Отмена"
        confirmLoading={mutation.isPending}
      >
        <Form<AddProductFormValues> form={form} layout="vertical">
          <FormItem
            label="Наименование"
            name="title"
            rules={[{ required: true, message: 'Введите наименование' }]}
          >
            <Input placeholder="Наименование товара" />
          </FormItem>

          <FormItem
            label="Цена"
            name="price"
            rules={[
              { required: true, message: 'Введите цену' },
              { pattern: /^\d+(\.\d{1,2})?$/, message: 'Введите корректную цену' },
            ]}
          >
            <Input placeholder="0.00" type="number" />
          </FormItem>

          <FormItem
            label="Вендор"
            name="brand"
            rules={[{ required: true, message: 'Введите вендора' }]}
          >
            <Input placeholder="Название бренда" />
          </FormItem>

          <FormItem
            label="Артикул"
            name="sku"
            rules={[{ required: true, message: 'Введите артикул' }]}
          >
            <Input placeholder="SKU-0001" />
          </FormItem>
        </Form>
      </Modal>
    </>
  );
}
