import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom'
import MainLayout from '@/components/Layout'
import PermissionGuard from '@/components/PermissionGuard'
import Dashboard from '@/pages/Dashboard'
import DataOverview from '@/pages/DataOverview'
import DataReport from '@/pages/DataReport'
import DataQuality from '@/pages/DataQuality'
import UserManagement from '@/pages/UserManagement'
import PermissionManagement from '@/pages/PermissionManagement'
import APIManagement from '@/pages/APIManagement'
import SystemSettings from '@/pages/SystemSettings'

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <MainLayout>
        <Outlet />
      </MainLayout>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: 'dashboard',
        element: (
          <PermissionGuard permission="dashboard:view">
            <Dashboard />
          </PermissionGuard>
        ),
      },
      {
        path: 'data-overview',
        element: (
          <PermissionGuard permission="data:overview">
            <DataOverview />
          </PermissionGuard>
        ),
      },
      {
        path: 'data-report',
        element: (
          <PermissionGuard permission="data:report">
            <DataReport />
          </PermissionGuard>
        ),
      },
      {
        path: 'data-quality',
        element: (
          <PermissionGuard permission="data:quality">
            <DataQuality />
          </PermissionGuard>
        ),
      },
      {
        path: 'data-assets',
        element: (
          <PermissionGuard permission="data:assets">
            <div>数据资产（开发中）</div>
          </PermissionGuard>
        ),
      },
      {
        path: 'users',
        element: (
          <PermissionGuard permission="user:manage">
            <UserManagement />
          </PermissionGuard>
        ),
      },
      {
        path: 'permissions',
        element: (
          <PermissionGuard permission="permission:manage">
            <PermissionManagement />
          </PermissionGuard>
        ),
      },
      {
        path: 'organization',
        element: (
          <PermissionGuard permission="org:view">
            <div>组织架构（开发中）</div>
          </PermissionGuard>
        ),
      },
      {
        path: 'content',
        element: (
          <PermissionGuard permission="content:manage">
            <div>内容管理（开发中）</div>
          </PermissionGuard>
        ),
      },
      {
        path: 'workflow',
        element: (
          <PermissionGuard permission="workflow:manage">
            <div>工作流（开发中）</div>
          </PermissionGuard>
        ),
      },
      {
        path: 'api-management',
        element: (
          <PermissionGuard permission="api:manage">
            <APIManagement />
          </PermissionGuard>
        ),
      },
      {
        path: 'audit-logs',
        element: (
          <PermissionGuard permission="audit:view">
            <div>审计日志（开发中）</div>
          </PermissionGuard>
        ),
      },
      {
        path: 'settings',
        element: (
          <PermissionGuard permission="setting:manage">
            <SystemSettings />
          </PermissionGuard>
        ),
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/dashboard" replace />,
  },
])

export default router
