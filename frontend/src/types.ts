// Field names and local date-time strings mirror the current CateringOrder entity.
export interface CateringOrder {
  id: number
  customerName: string | null
  customerPhone: string | null
  cashierName: string | null
  datePlaced: string | null
  pickupDate: string | null
  numberOfPeople: number | null
  orderDetails: string | null
  paid: boolean
  completed: boolean
  notes: string | null
}
export type StatusField = 'paid' | 'completed'
export type ConceptId = 'precision-table' | 'split-workspace' | 'hybrid-operations'
export interface ConceptProps {
  orders: CateringOrder[]
  selected: CateringOrder | undefined
  select: (id: number | null) => void
  toggle: (id: number, field: StatusField) => void
}
