import { Layout } from 'antd/lib';
// import './Layout.styles.scss';
interface Props {
  children: React.ReactNode;
}

export default function PageLayout({ children }: Props) {
  const { Header, Content } = Layout;
  return (
    <Layout className="layout" style={{ minHeight: '1000px' }}>
      <Header
        className="header"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      ></Header>
      <Content className="content" style={{ padding: '0 48px' }}>
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
