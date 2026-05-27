import { Layout } from 'antd'
import Sidebar from './Sidebar'
import TopBar from './TopBar'
import PageContainer from './PageContainer'
import type { ReactNode } from 'react'

const { Content } = Layout

interface MainLayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar />
      <Layout>
        <TopBar />
        <Content>
          <PageContainer>{children}</PageContainer>
        </Content>
      </Layout>
    </Layout>
  )
}
