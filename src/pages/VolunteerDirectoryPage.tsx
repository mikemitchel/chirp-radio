// src/pages/VolunteerDirectoryPage.tsx
import React, { useMemo } from 'react'
import CrPageHeader from '../stories/CrPageHeader'
import CrTable from '../stories/CrTable'
import CrChip from '../stories/CrChip'
import { useUsers } from '../hooks/useData'

const VolunteerDirectoryPage: React.FC = () => {
  const { data: users } = useUsers()

  // Filter users with volunteer roles (but NOT Board Members)
  const volunteerData = useMemo(() => {
    if (!users) return []
    return users
      .filter((user) => {
        const roles = user.roles || []
        // Show anyone with Volunteer role or DJ roles, but exclude Board Members
        const hasVolunteerRole = roles.some((role) =>
          ['Volunteer', 'Regular DJ', 'Substitute DJ'].includes(role)
        )
        const isBoardMember = roles.includes('Board Member')
        return hasVolunteerRole && !isBoardMember
      })
      .map((user) => {
        // Combine first and last name
        const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'N/A'
        // Filter out "Listener" role since it's implied
        const displayRoles = (user.roles || []).filter((role) => role !== 'Listener')

        return {
          id: user.id,
          name: fullName,
          roles: displayRoles,
          email: user.email,
          phone: user.primaryPhone || '',
        }
      })
  }, [users])

  // Render roles as multiple CrChips with custom colors
  const renderRoles = (roles: string[]) => {
    const getRoleColor = (role: string) => {
      if (role === 'Regular DJ') return 'var(--cr-secondary-100)'
      if (role === 'Substitute DJ') return 'var(--cr-primary-100)'
      if (role === 'Board Member') return 'var(--cr-accent-100)'
      if (role === 'Volunteer') return 'var(--cr-default-300)'
      return 'var(--cr-default-200)' // default for Listener
    }

    return (
      <div className="role-chips-container">
        {roles.map((role, index) => (
          <CrChip
            key={index}
            variant="light"
            size="small"
            style={{ backgroundColor: getRoleColor(role) }}
          >
            {role}
          </CrChip>
        ))}
      </div>
    )
  }

  // Render email as mailto link
  const renderEmail = (email: string) => {
    return (
      <a href={`mailto:${email}`} className="email-link">
        {email}
      </a>
    )
  }

  const columns = [
    { key: 'name', title: 'Name', sortable: true, width: 'medium' },
    { key: 'roles', title: 'Roles', sortable: false, width: 'medium', render: renderRoles },
    { key: 'email', title: 'Email', sortable: true, width: 'wide', render: renderEmail },
    { key: 'phone', title: 'Primary Phone', sortable: true, width: 'medium' },
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
