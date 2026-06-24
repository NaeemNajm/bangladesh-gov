import positions from './positions.json'

export function getAllPositions() {
  return positions
}

export function getPositionsByOfficeId(officeId) {
  return positions.filter((p) => p.office_id === officeId)
}

export function buildPositionTree(officeId) {
  const officePositions = getPositionsByOfficeId(officeId)
  const map = {}
  const roots = []

  officePositions.forEach((p) => {
    map[p.id] = { ...p, children: [] }
  })

  officePositions.forEach((p) => {
    if (p.parent_position_id && map[p.parent_position_id]) {
      map[p.parent_position_id].children.push(map[p.id])
    } else if (!p.parent_position_id) {
      roots.push(map[p.id])
    }
  })

  return roots
}
