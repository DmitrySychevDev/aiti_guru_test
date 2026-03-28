import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LockOutlined, UserOutlined, EyeInvisibleOutlined, EyeOutlined, CloseOutlined } from '@ant-design/icons';
import { Form, FormItem, useForm } from '@/shared/ui/Form';
import { Input, InputPassword } from '@/shared/ui/Input';
import { Button } from '@/shared/ui/Button';
import { Checkbox } from '@/shared/ui/Checkbox';
import { authApi, useAuthStore } from '@/entities/user';
import logoSvg from '@/assets/logo.svg';
import styles from './LoginForm.module.scss';

interface LoginFormValues {
  username: string;
  password: string;
  remember: boolean;
}

export function LoginForm() {
  const [form] = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);

  const handleSubmit = async (values: LoginFormValues) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authApi.login({
        username: values.username,
        password: values.password,
      });
      setToken(response.accessToken, values.remember);
      navigate('/products');
    } catch {
      setError('Неверный логин или пароль');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.inner}>
          <div className={styles.logoWrap}>
            <img src={logoSvg} alt="Logo" width={35} height={34} />
          </div>

          <div className={styles.textBlock}>
            <h1 className={styles.title}>Добро пожаловать!</h1>
            <p className={styles.subtitle}>Пожалуйста, авторизируйтесь</p>
          </div>

          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            initialValues={{ remember: false }}
            className={styles.form}
          >
            <FormItem
              label="Логин"
              name="username"
              rules={[{ required: true, message: 'Введите логин' }]}
            >
              <Input
                prefix={<UserOutlined style={{ color: '#C9C9C9' }} />}
                suffix={
                  <CloseOutlined
                    style={{ color: '#C9C9C9', cursor: 'pointer', fontSize: 12 }}
                    onClick={() => form.setFieldValue('username', '')}
                  />
                }
                placeholder="test"
                className={styles.input}
              />
            </FormItem>

            <FormItem
              label="Пароль"
              name="password"
              rules={[{ required: true, message: 'Введите пароль' }]}
            >
              <InputPassword
                prefix={<LockOutlined style={{ color: '#EDEDED' }} />}
                placeholder="•••••••••••••"
                className={styles.input}
                iconRender={(visible) =>
                  visible
                    ? <EyeOutlined style={{ color: '#EDEDED' }} />
                    : <EyeInvisibleOutlined style={{ color: '#EDEDED' }} />
                }
              />
            </FormItem>

            {error && <div className={styles.error}>{error}</div>}

            <FormItem name="remember" valuePropName="checked" className={styles.rememberItem}>
              <Checkbox className={styles.rememberCheckbox}>Запомнить данные</Checkbox>
            </FormItem>

            <div className={styles.bottomBlock}>
              <FormItem className={styles.submitItem}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loading}
                  block
                  className={styles.submitBtn}
                >
                  Войти
                </Button>
              </FormItem>

              <div className={styles.divider}>
                <span className={styles.dividerLine} />
                <span className={styles.dividerText}>или</span>
                <span className={styles.dividerLine} />
              </div>

              <p className={styles.register}>
                Нет аккаунта?{' '}
                <a href="#" onClick={(e) => e.preventDefault()}>
                  Создать
                </a>
              </p>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
