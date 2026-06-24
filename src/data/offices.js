import offices from './offices.json'

export function buildOfficeTree() {
  const map = {}
  const roots = []

  offices.forEach((o) => {
    map[o.id] = { ...o, children: [] }
  })

  offices.forEach((o) => {
    if (o.parent_office_id && map[o.parent_office_id]) {
      map[o.parent_office_id].children.push(map[o.id])
    } else if (!o.parent_office_id) {
      roots.push(map[o.id])
    }
  })

  return roots
}

export function buildCategoryTree(category) {
  const categoryOffices = offices.filter((o) => o.category === category)
  const map = {}
  const roots = []

  categoryOffices.forEach((o) => {
    map[o.id] = { ...o, children: [] }
  })

  categoryOffices.forEach((o) => {
    if (o.parent_office_id && map[o.parent_office_id]) {
      map[o.parent_office_id].children.push(map[o.id])
    } else {
      roots.push(map[o.id])
    }
  })

  return roots
}

export function getAllOffices() {
  return offices
}

export function findOfficeById(id) {
  return offices.find((o) => o.id === id) || null
}

export function getChildOffices(officeId) {
  return offices.filter((o) => o.parent_office_id === officeId)
}

export function getParentOffice(officeId) {
  const office = findOfficeById(officeId)
  if (!office || !office.parent_office_id) return null
  return findOfficeById(office.parent_office_id)
}

export function getCategoryColor(category) {
  const colors = {
    Executive: { bg: 'bg-blue-50 border-blue-500', text: 'text-blue-800', badge: 'bg-blue-100 text-blue-700', icon: 'bg-blue-500', light: 'bg-blue-50' },
    Legislative: { bg: 'bg-amber-50 border-amber-500', text: 'text-amber-800', badge: 'bg-amber-100 text-amber-700', icon: 'bg-amber-500', light: 'bg-amber-50' },
    Judiciary: { bg: 'bg-emerald-50 border-emerald-500', text: 'text-emerald-800', badge: 'bg-emerald-100 text-emerald-700', icon: 'bg-emerald-500', light: 'bg-emerald-50' },
    Constitutional: { bg: 'bg-purple-50 border-purple-500', text: 'text-purple-800', badge: 'bg-purple-100 text-purple-700', icon: 'bg-purple-500', light: 'bg-purple-50' },
  }
  return colors[category] || colors.Executive
}
