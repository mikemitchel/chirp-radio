// src/pages/VolunteerDirectoryPage.tsx
import React, { useMemo } from 'react'
import { useNavigate } from 'react-router'
import CrBreadcrumb from '../stories/CrBreadcrumb'
import CrPageHeader from '../stories/CrPageHeader'
import CrTable from '../stories/CrTable'
import CrChip from '../stories/CrChip'
import { useUsers } from '../hooks/useData'

const VolunteerDirectoryPage: React.FC = () => {
  const navigate = useNavigate()
  const { data: users } = useUsers()

  // Filter users with volunteer roles
  const volunteerData = useMemo(() => {
    if (!users) return []
    return users
      .filter(user => ['Regular DJ', 'Substitute DJ', 'Content Publisher', 'General'].includes(user.role))
      .map(user => ({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        djName: user.djName || '',
        role: user.role,
        email: user.email,
        phone: user.phone || ''
      }))
  }, [users])

  const breadcrumbItems = [
    { label: 'Home', path: '/', onClick: () => navigate('/') },
    { label: 'Volunteer Directory', path: '/volunteer-directory', isActive: true }
  ]

  // Render role as CrChip with custom colors
  const renderRole = (role: string) => {
    let backgroundColor = 'var(--cr-default-300)' // default for General

    if (role === 'Regular DJ') {
      backgroundColor = 'var(--cr-secondary-100)'
    } else if (role === 'Substitute DJ') {
      backgroundColor = 'var(--cr-primary-100)'
    } else if (role === 'Content Publisher') {
      backgroundColor = 'var(--cr-accent-100)'
    }

    return (
      <CrChip
        variant="light"
        size="small"
        style={{ backgroundColor }}
      >
        {role}
      </CrChip>
    )
  }

  // Render email as mailto link
  const renderEmail = (email: string) => {
    return (
      <a href={`mailto:${email}`} style={{ color: 'var(--cr-primary-500)', textDecoration: 'underline' }}>
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
    { key: 'phone', title: 'Primary Phone', sortable: true, width: 'medium' }
  ]

  return (
    <div className="volunteer-directory-page">
      <section className="page-container">
        <CrPageHeader
          eyebrowText="FOR VOLUNTEERS"
          title="Volunteer Directory"
          titleTag="h1"
          titleSize="xl"
          showEyebrow={true}
          showActionButton={false}
        />
        <CrTable
          columns={columns}
          data={volunteerData}
          sortable={true}
          variant="default"
          showActionButton={false}
        />
      </section>
    </div>
  )
}

export default VolunteerDirectoryPage
