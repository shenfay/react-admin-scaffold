import {
  DashboardOutlined,
  BarChartOutlined,
  LineChartOutlined,
  SafetyCertificateOutlined,
  DatabaseOutlined,
  UserOutlined,
  TeamOutlined,
  ApartmentOutlined,
  FileTextOutlined,
  NodeIndexOutlined,
  ApiOutlined,
  AuditOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import React, { type ReactNode } from 'react'

export interface MenuItem {
  key: string
  label: string
  icon?: ReactNode
  path?: string
  children?: MenuItem[]
  badge?: number
  permission?: string
}

export const menuConfig: MenuItem[] = [
  {
    key: 'overview',
    label: '概览',
    children: [
      {
        key: 'dashboard',
        label: '工作台',
        icon: 'DashboardOutlined',
        path: '/dashboard',
        permission: 'dashboard:view',
      },
    ],
  },
  {
    key: 'data',
    label: '数据中台',
    children: [
      {
        key: 'data-overview',
        label: '数据概览',
        icon: 'BarChartOutlined',
        path: '/data-overview',
        permission: 'data:overview',
      },
      {
        key: 'data-report',
        label: '数据报表',
        icon: 'LineChartOutlined',
        path: '/data-report',
        permission: 'data:report',
      },
      {
        key: 'data-quality',
        label: '数据质量',
        icon: 'SafetyCertificateOutlined',
        path: '/data-quality',
        permission: 'data:quality',
      },
      {
        key: 'data-assets',
        label: '数据资产',
        icon: 'DatabaseOutlined',
        path: '/data-assets',
        permission: 'data:assets',
      },
    ],
  },
  {
    key: 'user',
    label: '用户中心',
    children: [
      {
        key: 'user-management',
        label: '用户管理',
        icon: 'UserOutlined',
        path: '/users',
        permission: 'user:manage',
      },
      {
        key: 'permission-management',
        label: '权限管理',
        icon: 'TeamOutlined',
        path: '/permissions',
        permission: 'permission:manage',
      },
      {
        key: 'organization',
        label: '组织架构',
        icon: 'ApartmentOutlined',
        path: '/organization',
        permission: 'org:view',
      },
    ],
  },
  {
    key: 'business',
    label: '业务中台',
    children: [
      {
        key: 'content-management',
        label: '内容管理',
        icon: 'FileTextOutlined',
        path: '/content',
        permission: 'content:manage',
        badge: 3,
      },
      {
        key: 'workflow',
        label: '工作流',
        icon: 'NodeIndexOutlined',
        path: '/workflow',
        permission: 'workflow:manage',
      },
      {
        key: 'api-management',
        label: 'API 管理',
        icon: 'ApiOutlined',
        path: '/api-management',
        permission: 'api:manage',
      },
    ],
  },
  {
    key: 'system',
    label: '系统',
    children: [
      {
        key: 'audit-log',
        label: '审计日志',
        icon: 'AuditOutlined',
        path: '/audit-logs',
        permission: 'audit:view',
      },
      {
        key: 'system-settings',
        label: '系统设置',
        icon: 'SettingOutlined',
        path: '/settings',
        permission: 'setting:manage',
      },
    ],
  },
]

const iconMap: Record<string, ReactNode> = {
  DashboardOutlined: React.createElement(DashboardOutlined),
  BarChartOutlined: React.createElement(BarChartOutlined),
  LineChartOutlined: React.createElement(LineChartOutlined),
  SafetyCertificateOutlined: React.createElement(SafetyCertificateOutlined),
  DatabaseOutlined: React.createElement(DatabaseOutlined),
  UserOutlined: React.createElement(UserOutlined),
  TeamOutlined: React.createElement(TeamOutlined),
  ApartmentOutlined: React.createElement(ApartmentOutlined),
  FileTextOutlined: React.createElement(FileTextOutlined),
  NodeIndexOutlined: React.createElement(NodeIndexOutlined),
  ApiOutlined: React.createElement(ApiOutlined),
  AuditOutlined: React.createElement(AuditOutlined),
  SettingOutlined: React.createElement(SettingOutlined),
}

export function getIcon(name: string): ReactNode {
  return iconMap[name] || null
}

export function flattenMenu(menus: MenuItem[]): MenuItem[] {
  const result: MenuItem[] = []
  menus.forEach(menu => {
    if (menu.children) {
      result.push(...flattenMenu(menu.children))
    } else {
      result.push(menu)
    }
  })
  return result
}

export const flatMenuConfig = flattenMenu(menuConfig)
