'use client';

import dynamic from 'next/dynamic';

/**
 * The command menu renders nothing until it is opened, so its code is loaded
 * after the page is interactive instead of with the first screen.
 */
const CommandMenu = dynamic(() => import('@/components/shared/CommandMenu').then((module) => module.CommandMenu), {
  ssr: false,
});

export function CommandMenuLoader() {
  return <CommandMenu />;
}
