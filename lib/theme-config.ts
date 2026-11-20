/**
 * Site style constants. Kept free of client-only code so the server layout
 * can import them.
 */

export type Theme = 'mission' | 'workspace';

export const THEME_KEY = 'webai-theme';

export const THEME_META: Record<Theme, { label: string; short: string; themeColor: string }> = {
  mission: { label: 'Mission Control', short: 'Mission', themeColor: '#05080d' },
  workspace: { label: 'Workspace', short: 'Workspace', themeColor: '#f6f5f1' },
};

/**
 * Inline script for <head>. Restores the visitor's saved style before first
 * paint, so the page never flashes the wrong one. It also records the
 * platform, so shortcut hints can show the right modifier key, and adds a
 * `js` class that scroll reveals depend on. If the page script has not
 * started within 4 seconds the class is removed, so content is never left
 * hidden.
 */
export const THEME_INIT_SCRIPT = `(function(){var d=document.documentElement;d.classList.add('js');setTimeout(function(){if(!window.__revealReady)d.classList.remove('js');},4000);try{document.documentElement.dataset.os=/Mac|iPhone|iPad/.test(navigator.platform)?'mac':'pc';}catch(e){}try{var t=localStorage.getItem('${THEME_KEY}');if(t!=='workspace'&&t!=='mission')return;document.documentElement.dataset.theme=t;if(t==='workspace'){document.addEventListener('DOMContentLoaded',function(){var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute('content','${THEME_META.workspace.themeColor}');});}}catch(e){}})();`;
