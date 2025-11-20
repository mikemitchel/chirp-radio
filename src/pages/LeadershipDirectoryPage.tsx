// src/pages/LeadershipDirectoryPage.tsx
import React, { useMemo } from 'react'
import CrPageHeader from '../stories/CrPageHeader'
import CrTable from '../stories/CrTable'
import CrChip from '../stories/CrChip'
import { useUsers } from '../hooks/useData'

const LeadershipDirectoryPage: React.FC = () => {
  const { data: users } = useUsers()

  // Filter users with Board Member role
  const leadershipData = useMemo(() => {
    if (!users) return []
    return users
      .filter((user) => {
        const roles = user.roles || []
        return roles.includes('Board Member')
      })
      .map((user) => {
        // Combine first and last name
        const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'N/A'
        // Filter out "Listener" and "Volunteer" - only show Board Member and DJ roles
        const displayRoles = (user.roles || []).filter(
          (role) => role !== 'Listener' && role !== 'Volunteer'
        )

        return {
          id: user.id,
          name: fullName,
          boardPosition: user.boardPosition || 'Board Member',
          roles: displayRoles,
          email: user.email,
          phone: user.primaryPhone || '',
        }
      })
  }, [users])

  // Render board position as CrChip
  const renderBoardPosition = (position: string) => {
    const backgroundColor = 'var(--cr-accent-100)'
    return (
      <CrChip variant="light" size="small" style={{ backgroundColor }}>
        {position}
      </CrChip>
    )
  }

  // Render all roles as multiple CrChips
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
    {
      key: 'boardPosition',
      title: 'Board Position',
      sortable: true,
      width: 'medium',
      render: renderBoardPosition,
    },
    { key: 'roles', title: 'Roles', sortable: false, width: 'medium', render: renderRoles },
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
