(function() {
  const dialog = {
    version: '0.1.0',
    _listeners: {
      triggers: {}, // [dialog.id]: [[trigger, listener]]
      closeTriggers: {}, // [dialog.id]: [[trigger, listener]]
    },
    getDialogs() {
      return document.querySelectorAll(`[id][role='dialog']`)
    },
    getDialogTriggers(dialog) {
      const dialogId = dialog.getAttribute('id')
      if (typeof dialogId !== 'string' || dialogId.length === 0) { return [] }
      return document.querySelectorAll(`[aria-haspopup="dialog"][aria-controls="${dialogId}"]`)
    },
    open(dialog) {
      // skip if already open
      if (dialog.hasAttribute('open')) { return }

      // mark dialog as open
      dialog.setAttribute('open', '')

      // for each trigger
      //   remove trigger's event listener
      //   set trigger as expanded
      const triggersListeners = window.baunilha.dialog._listeners.triggers[dialog.id]
      for (let [trigger, listener] of triggersListeners) {
        trigger.removeEventListener('click', listener)
        trigger.setAttribute('aria-expanded', 'true')
      }
      window.baunilha.dialog._listeners.triggers[dialog.id] = []

      window.baunilha.dialog.hookDialogCloseTriggers(dialog)
    },
    close(dialog) {
      // skip if already closed
      if (!dialog.hasAttribute('open')) { return }

      // mark dialog as closed
      dialog.removeAttribute('open')

      // for each trigger
      //   add event listener
      //   mark as not expanded
      const openTriggers = window.baunilha.dialog.getDialogTriggers(dialog)
      const openTriggersListeners = []
      for (let trigger of openTriggers) {
        trigger.setAttribute('aria-expanded', 'false')
        function listener(e) {
          e.stopPropagation()
          window.baunilha.dialog.open(dialog)
        }
        trigger.addEventListener('click', listener)
        openTriggersListeners.push([trigger, listener])
      }
      window.baunilha.dialog._listeners.triggers[dialog.id] = openTriggersListeners

      // for each close trigger
      //   remove event listener
      const closeTriggersListeners = window.baunilha.dialog._listeners.closeTriggers[dialog.id]
      for (let [trigger, listener] of closeTriggersListeners) {
        trigger.removeEventListener('click', listener)
      }
      window.baunilha.dialog._listeners.closeTriggers[dialog.id] = []
    },
    hookDialogCloseTriggers(dialog) {
      // register event listeners for close buttons
      const closeTriggers = dialog.querySelectorAll('[close]')
      const closeListeners = []
      for (let trigger of closeTriggers) {
        function listener(e) {
          e.stopPropagation()
          window.baunilha.dialog.close(dialog)
        }
        trigger.addEventListener('click', listener)
        closeListeners.push([trigger, listener])
      }
      window.baunilha.dialog._listeners.closeTriggers[dialog.id] = closeListeners
    },
    hookDialogTriggers(dialog) {
      const triggers = window.baunilha.dialog.getDialogTriggers(dialog)
      let listeners = []
      for (let trigger of triggers) {
        function listener(e) {
          e.stopPropagation()
          window.baunilha.dialog.open(dialog)
        }
        trigger.addEventListener('click', listener)
        listeners.push([trigger, listener])
      }
      window.baunilha.dialog._listeners.triggers[dialog.id] = listeners

      // If dialog starts open, we need to hook its close triggers
      if (dialog.hasAttribute('open')) {
        window.baunilha.dialog.hookDialogCloseTriggers(dialog)
      }
    },
    setupPortal() {
      const portal = document.createElement('div')
      portal.setAttribute('id', 'dialog-portal')
      const body = document.getElementsByTagName('body')[0]
      body.appendChild(portal)
      return portal
    },
    setup() {
      const dialogs = window.baunilha.dialog.getDialogs()
      if (dialogs.length === 0) { return }
      const portal = window.baunilha.dialog.setupPortal()
      for (let dialog of dialogs) {
        portal.appendChild(dialog)
        window.baunilha.dialog.hookDialogTriggers(dialog)
      }
    }
  }
  document.addEventListener('DOMContentLoaded', () => {
    if (typeof window.baunilha === 'undefined') {
      window.baunilha = {}
    }
    if (typeof window.baunilha.dialog === 'undefined') {
      window.baunilha.dialog = { ...dialog }
    }
    window.baunilha.dialog.setup()
  })
})()
