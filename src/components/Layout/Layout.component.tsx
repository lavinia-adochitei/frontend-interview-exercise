import { Layout } from 'antd/lib';
interface Props {
  children: React.ReactNode;
}

export default function PageLayout({ children }: Props) {
  const { Header, Content } = Layout;
  return (
    <Layout className="layout">
      <Header className="header"></Header>
      <Content className="content">
        <div
          style={{
            padding: 24,
            minHeight: 380,
            background: 'rgb(221, 244, 255)',
            borderRadius: '10px',
          }}
        >
          {children}
        </div>
      </Content>
    </Layout>
  );
}
