import { useState } from 'react'
import { Layout, Menu, Badge, Avatar, Button } from 'antd'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BellOutlined,
} from '@ant-design/icons'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAppStore } from '@/stores'
import { menuConfig, getIcon } from '@/config/menu'
import type { MenuItem } from '@/config/menu'

const { Sider } = Layout

function renderMenuItems(items: MenuItem[], userMenus: string[]): MenuItem[] {
  return items
    .map(item => {
      if (item.children) {
        const filteredChildren = renderMenuItems(item.children, userMenus)
        if (filteredChildren.length === 0) return null
        return {
          ...item,
          children: filteredChildren,
        }
      }
      if (!item.permission || userMenus.includes(item.key)) {
        return {
          ...item,
          icon: item.icon ? getIcon(item.icon as string) : undefined,
          label: item.badge ? (
            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              {item.label}
              <Badge count={item.badge} size="small" style={{ background: 'var(--red)' }} />
            </span>
          ) : (
            item.label
          ),
        }
      }
      return null
    })
    .filter(Boolean) as MenuItem[]
}

export default function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()
  const { sidebarCollapsed, toggleSidebar, username, menus } = useAppStore()
  const [openKeys, setOpenKeys] = useState<string[]>(['overview', 'data'])

  const filteredMenu = renderMenuItems(menuConfig, menus)

  const handleMenuClick = ({ key }: { key: string }) => {
    const item = menuConfig
      .flatMap(m => m.children || [m])
      .find(i => i.key === key)
    if (item?.path) {
      navigate(item.path)
    }
  }

  const selectedKey = menuConfig
    .flatMap(m => m.children || [m])
    .find(i => i.path === location.pathname)?.key

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={sidebarCollapsed}
      width={224}
      collapsedWidth={56}
      style={{
        background: 'var(--sidebar-bg)',
        borderRight: '1px solid var(--border-color)',
        transition: 'all var(--transition)',
      }}
    >
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Logo */}
        <div
          style={{
            padding: '16px 12px',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            height: 56,
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              minWidth: 32,
              background: 'var(--accent)',
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 700,
              fontSize: 15,
            }}
          >
            Z
          </div>
          {!sidebarCollapsed && (
            <span
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: 'var(--text-primary)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                flex: 1,
              }}
            >
              中台管理
            </span>
          )}
          <Button
            type="text"
            icon={sidebarCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={toggleSidebar}
            style={{
              width: 24,
              height: 24,
              minWidth: 24,
              padding: 0,
              color: 'var(--text-muted)',
            }}
          />
        </div>

        {/* Menu */}
        <div style={{ flex: 1, overflow: 'auto', padding: '0 6px' }}>
          <Menu
            mode="inline"
            selectedKeys={selectedKey ? [selectedKey] : []}
            openKeys={sidebarCollapsed ? [] : openKeys}
            onOpenChange={setOpenKeys}
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            items={filteredMenu as any}
            onClick={handleMenuClick}
            style={{
              background: 'transparent',
              borderRight: 'none',
            }}
          />
        </div>

        {/* Footer */}
        <div
          style={{
            padding: '12px 12px 16px',
            borderTop: '1px solid var(--border-color)',
            flexShrink: 0,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: 4,
                borderRadius: 'var(--radius-sm)',
                cursor: 'pointer',
                transition: 'background 0.15s',
                flex: 1,
                minWidth: 0,
                overflow: 'hidden',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--hover-bg)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'transparent'
              }}
            >
              <Avatar
                size={28}
                style={{
                  background: 'linear-gradient(135deg, #4ECDC4, #44B09E)',
                  fontSize: 11,
                  fontWeight: 600,
                  minWidth: 28,
                }}
              >
                {username?.charAt(0) || '管'}
              </Avatar>
              {!sidebarCollapsed && (
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: 'var(--text-primary)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                  }}
                >
                  {username || '管理员'}
                </span>
              )}
            </div>
            <Button
              type="text"
              icon={
                <BellOutlined
                  style={{
                    fontSize: 16,
                    color: 'var(--text-secondary)',
                  }}
                />
              }
              style={{
                width: 28,
                height: 28,
                minWidth: 28,
                padding: 0,
                position: 'relative',
              }}
            >
              <Badge
                count={29}
                size="small"
                style={{
                  background: 'var(--red)',
                  position: 'absolute',
                  top: -2,
                  right: -2,
                }}
              />
            </Button>
          </div>
        </div>
      </div>
    </Sider>
  )
}
