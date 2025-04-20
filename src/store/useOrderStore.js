import { create } from 'zustand'

export const useOrderStore = create((set) => ({
  tableNumber: '',
  paymentType: '',
  cart: [],
  addItem: (item) =>
    set((state) => ({
      cart: [...state.cart, item]
    })),
  removeItem: (index) =>
    set((state) => {
      const updated = [...state.cart]
      updated.splice(index, 1)
      return { cart: updated }
    }),
  updateItem: (index, updatedItem) =>
    set((state) => {
      const updated = [...state.cart]
      updated[index] = { ...updated[index], ...updatedItem }
      return { cart: updated }
    }),
  setTableNumber: (tableNumber) => set({ tableNumber }),
  setPaymentType: (paymentType) => set({ paymentType }),
  clearCart: () => set({ cart: [], tableNumber: '', paymentType: '' })
}))
