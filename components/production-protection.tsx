'use client';

import { useEffect } from 'react';

const DEVTOOLS_KEYS = new Set(['i', 'j', 'c']);

export function ProductionProtection() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return;

    function blockEvent(event: Event) {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
    }

    function handleKeyDown(event: KeyboardEvent) {
      const key = event.key.toLowerCase();
      const windowsDevtools = event.ctrlKey && event.shiftKey && DEVTOOLS_KEYS.has(key);
      const macDevtools = event.metaKey && event.altKey && DEVTOOLS_KEYS.has(key);
      const viewSource = (event.ctrlKey || event.metaKey) && key === 'u';

      if (event.key === 'F12' || windowsDevtools || macDevtools || viewSource) {
        blockEvent(event);
      }
    }

    function handleContextMenu(event: MouseEvent) {
      blockEvent(event);
    }

    function handleDragStart(event: DragEvent) {
      const target = event.target;
      if (target instanceof Element && target.closest('[data-protected-media]')) {
        blockEvent(event);
      }
    }

    document.addEventListener('keydown', handleKeyDown, { capture: true });
    document.addEventListener('contextmenu', handleContextMenu, { capture: true });
    document.addEventListener('dragstart', handleDragStart, { capture: true });

    return () => {
      document.removeEventListener('keydown', handleKeyDown, { capture: true });
      document.removeEventListener('contextmenu', handleContextMenu, { capture: true });
      document.removeEventListener('dragstart', handleDragStart, { capture: true });
    };
  }, []);

  return null;
}
