import { equipment } from '../data/equipment'
import { TopBar } from '../components/TopBar'
import { EquipmentCard } from '../components/Cards'

export function EquipmentPage() {
  return (
    <div className="safe-bottom">
      <TopBar title="Máquinas" />
      <div className="grid grid-cols-2 gap-3 px-4">
        {equipment.map((item) => (
          <EquipmentCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  )
}
