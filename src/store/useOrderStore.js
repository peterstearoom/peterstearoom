import { create } from 'zustand'

export const useOrderStore = create((set) => ({
  tableNumber: '',
  waiterName: '',
  paymentType: '',
  cart: [],

  setTableNumber: (tableNumber) => set({ tableNumber }),
  setWaiterName: (name) => set({ waiterName: name }),
  setPaymentType: (paymentType) => set({ paymentType }),

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

  clearCart: () => set({ cart: [], tableNumber: '', waiterName: '', paymentType: '' })
}))
