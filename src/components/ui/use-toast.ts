"use client"

// Inspired by react-hot-toast library
import * as React from "react"

type ToasterToast = ToastProps & {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactElement
}

const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 1000000

type ToasterProps = {
  toasts: ToasterToast[]
  dismiss: (toastId?: string) => void
  remove: (toastId?: string) => void
}

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const

let count = 0

function genId() {
  count = (count + 1) % 100
  return count.toString()
}

type ActionType = typeof actionTypes

type Action =
  | {
      type: ActionType["ADD_TOAST"]
      toast: ToasterToast
    }
  | {
      type: ActionType["UPDATE_TOAST"]
      toast: Partial<ToasterToast>
    }
  | {
      type: ActionType["DISMISS_TOAST"]
      toastId?: ToasterToast["id"]
    }
  | {
      type: ActionType["REMOVE_TOAST"]
      toastId?: ToasterToast["id"]
    }

interface State {
  toasts: ToasterToast[]
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>()

const addToaster = (state: State, toast: ToasterToast): State => {
  const toasts = [toast, ...state.toasts].slice(0, TOAST_LIMIT)
  return { ...state, toasts }
}

const updateToaster = (state: State, action: Action): State => {
  if ("toast" in action && action.toast.id) {
    const { id } = action.toast
    const toasts = state.toasts.map((t) =>
      t.id === id ? { ...t, ...action.toast } : t
    )
    return { ...state, toasts }
  }
  return state
}

const dismissToaster = (state: State, action: Action): State => {
  if ("toastId" in action) {
    const { toastId } = action

    // ! Side effects ! - This could be extracted into a dismissToast() action,
    // but I'll keep it here for simplicity
    if (toastId) {
      addToastToRemoveQueue(toastId)
    } else {
      state.toasts.forEach((toast) => {
        addToastToRemoveQueue(toast.id)
      })
    }

    const toasts = state.toasts.map((t) =>
      t.id === toastId || toastId === undefined
        ? {
            ...t,
            open: false,
          }
        : t
    )
    return { ...state, toasts }
  }
  return state
}

const removeToaster = (state: State, action: Action): State => {
  if ("toastId" in action) {
    const { toastId } = action
    const toasts = toastId
      ? state.toasts.filter((t) => t.id !== toastId)
      : []
    return { ...state, toasts }
  }
  return state
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return addToaster(state, action.toast)
    case "UPDATE_TOAST":
      return updateToaster(state, action)
    case "DISMISS_TOAST":
      return dismissToaster(state, action)
    case "REMOVE_TOAST":
      return removeToaster(state, action)
  }
}

const listeners: Array<(state: State) => void> = []

let memoryState: State = { toasts: [] }

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action)
  listeners.forEach((listener) => {
    listener(memoryState)
  })
}

type Toast = Omit<ToasterToast, "id">

function toast(props: Toast) {
  const id = genId()

  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    })
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss()
      },
    },
  })

  return {
    id: id,
    dismiss,
    update,
  }
}

function useToast() {
  const [state, setState] = React.useState<State>(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) {
        listeners.splice(index, 1)
      }
    }
  }, [state])

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

function addToastToRemoveQueue(toastId: string) {
  if (toastTimeouts.has(toastId)) {
    return
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId)
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    })
  }, TOAST_REMOVE_DELAY)

  toastTimeouts.set(toastId, timeout)
}

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>

export { useToast, toast, type ToastProps }
