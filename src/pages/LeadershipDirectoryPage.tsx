// src/pages/LeadershipDirectoryPage.tsx
import React, { useMemo } from 'react'
import { useNavigate } from 'react-router'
import CrBreadcrumb from '../stories/CrBreadcrumb'
import CrPageHeader from '../stories/CrPageHeader'
import CrTable from '../stories/CrTable'
import CrChip from '../stories/CrChip'
import { useUsers } from '../hooks/useData'

const LeadershipDirectoryPage: React.FC = () => {
  const navigate = useNavigate()
  const { data: users } = useUsers()

  // Filter users with leadership roles
  const leadershipData = useMemo(() => {
    if (!users) return []
    return users
      .filter((user) =>
        ['President', 'Vice President', 'Treasurer', 'Board Member'].includes(user.role)
      )
      .map((user) => ({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        djName: user.djName || '',
        role: user.role,
        email: user.email,
        phone: user.phone || '',
      }))
  }, [users])

  const breadcrumbItems = [
    { label: 'Home', path: '/', onClick: () => navigate('/') },
    { label: 'Leadership Directory', path: '/leadership-directory', isActive: true },
  ]

  // Render role as CrChip with custom colors
  const renderRole = (role: string) => {
    let backgroundColor = 'var(--cr-default-300)' // default for Board Member

    if (role === 'President') {
      backgroundColor = 'var(--cr-secondary-100)'
    } else if (role === 'Vice President') {
      backgroundColor = 'var(--cr-primary-100)'
    } else if (role === 'Treasurer') {
      backgroundColor = 'var(--cr-accent-100)'
    }

    return (
      <CrChip variant="light" size="small" style={{ backgroundColor }}>
        {role}
      </CrChip>
    )
  }

  // Render email as mailto link
  const renderEmail = (email: string) => {
    return (
      <a
        href={`mailto:${email}`}
        style={{ color: 'var(--cr-primary-500)', textDecoration: 'underline' }}
      >
        {email}
      </a>
    )
  }

  const columns = [
    { key: 'firstName', title: 'First Name', sortable: true, width: 'medium' },
    { key: 'lastName', title: 'Last Name', sortable: true, width: 'medium' },
    { key: 'djName', title: 'DJ Name', sortable: true, width: 'medium' },
    { key: 'role', title: 'Role', sortable: true, width: 'medium', render: renderRole },
    { key: 'email', title: 'Email', sortable: true, width: 'wide', render: renderEmail },
    { key: 'phone', title: 'Primary Phone', sortable: true, width: 'medium' },
  ]

  return (
    <div className="leadership-directory-page">
      <section className="page-container">
        <CrPageHeader
          eyebrowText="FOR VOLUNTEERS"
          title="Leadership Directory"
          titleTag="h1"
          titleSize="xl"
          showEyebrow={true}
          showActionButton={false}
        />
        <CrTable
          columns={columns}
          data={leadershipData}
          sortable={true}
          variant="default"
          showActionButton={false}
        />
      </section>
    </div>
  )
}

export default LeadershipDirectoryPage
