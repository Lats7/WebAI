export const COMMAND_MENU_OPEN_EVENT = 'webai:command-menu';

let pendingOpen = false;

/** Open the command menu from anywhere, for example a button in the nav. */
export function openCommandMenu() {
  // The menu's code loads after the page is interactive. If someone asks for it
  // before then, remember the request so the menu opens as soon as it arrives.
  pendingOpen = true;
  window.dispatchEvent(new Event(COMMAND_MENU_OPEN_EVENT));
}

/** True once if an open was requested before the menu had loaded. */
export function takePendingOpen() {
  const value = pendingOpen;
  pendingOpen = false;
  return value;
}
