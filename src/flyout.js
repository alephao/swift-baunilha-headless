(function() {
  const flyout = {
    version: '0.1.0',
    _listeners: {
      triggers: {},
      closeTriggers: {},
    },
    getFlyoutButtons() {
      return document.querySelectorAll(`[aria-haspopup='menu']`)
    },
    getFlyouts() {
      const triggers = window.baunilha.flyout.getFlyoutButtons()
      const idSet = new Set()
      const flyouts = []
      for (let trigger of triggers) {
        const id = trigger.getAttribute('aria-controls')
        if (!idSet.has(id)) {
          idSet.add(id)
          flyouts.push(document.getElementById(id))
        }
      }
      return flyouts
    },
    getFlyoutTriggers(flyout) {
      const flyoutId = flyout.getAttribute('id')
      if (typeof flyoutId !== 'string' || flyoutId.length === 0) { return [] }
      return document.querySelectorAll(`[aria-haspopup="menu"][aria-controls="${flyoutId}"]`)
    },
    open(flyout) {
      // skip if already open
      if (flyout.hasAttribute('open')) { return }

      // mark as open
      flyout.setAttribute('open', '')

      const closeListeners = []

      // for each trigger
      //   remove trigger's event listener
      //   add close listener
      //   set trigger as expanded
      const triggersListeners = window.baunilha.flyout._listeners.triggers[flyout.id]
      function triggerCloseListener(e) {
        e.stopPropagation()
        window.baunilha.flyout.close(flyout)
      }
      for (let [trigger, listener] of triggersListeners) {
        trigger.removeEventListener('click', listener)
        trigger.addEventListener('click', triggerCloseListener)
        trigger.setAttribute('aria-expanded', 'true')
        closeListeners.push([trigger, triggerCloseListener])
      }
      window.baunilha.flyout._listeners.triggers[flyout.id] = []

      // Add event listeners for closing
      const docListener = function (e) {
        e.stopPropagation()
        window.baunilha.flyout.close(flyout)
        // if (!flyout.contains(e.target)) {
        // }
      }
      document.addEventListener("click", docListener);
      closeListeners.push([document, docListener]);

      window.baunilha.flyout._listeners.closeTriggers[flyout.id] = closeListeners
    },
    close(flyout) {
      // skip if already closed
      if (!flyout.hasAttribute('open')) { return }

      // mark flyout as open
      flyout.removeAttribute('open')

      // for each trigger
      //   add event listener
      //   mark as not expanded
      const openTriggers = window.baunilha.flyout.getFlyoutTriggers(flyout)
      const openTriggersListeners = []
      for (let trigger of openTriggers) {
        trigger.setAttribute('aria-expanded', 'false')
        function listener(e) {
          e.stopPropagation()
          window.baunilha.flyout.open(flyout)
        }
        trigger.addEventListener('click', listener)
        openTriggersListeners.push([trigger, listener])
      }
      window.baunilha.flyout._listeners.triggers[flyout.id] = openTriggersListeners

      // for each close trigger
      //   remove event listener
      const closeTriggersListeners = window.baunilha.flyout._listeners.closeTriggers[flyout.id]
      for (let [trigger, listener] of closeTriggersListeners) {
        trigger.removeEventListener('click', listener)
      }
      window.baunilha.flyout._listeners.closeTriggers[flyout.id] = []

    },
    hookFlyoutTriggers(flyout) {
      const triggers = window.baunilha.flyout.getFlyoutTriggers(flyout)
      let listeners = []
      for (let trigger of triggers) {
        function listener(e) {
          e.stopPropagation()
          window.baunilha.flyout.open(flyout)
        }
        trigger.addEventListener('click', listener)
        listeners.push([trigger, listener])
      }
      window.baunilha.flyout._listeners.triggers[flyout.id] = listeners
    },
    setup() {
      const flyouts = window.baunilha.flyout.getFlyouts()
      for (let flyout of flyouts) {
        window.baunilha.flyout.hookFlyoutTriggers(flyout)
      }
    }
  }
  document.addEventListener('DOMContentLoaded', () => {
    if (typeof window.baunilha === 'undefined') {
      window.baunilha = {}
    }
    if (typeof window.baunilha.flyout === 'undefined') {
      window.baunilha.flyout = { ...flyout }
    }
    window.baunilha.flyout.setup()
  })
})()
