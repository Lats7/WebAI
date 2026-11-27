import { HOLDING_MESSAGE } from '@/lib/holding';

/** The whole of the site while the holding page is on. The wording is in holding.json. */
export function Holding() {
  return (
    <div className="grid min-h-[100svh] place-items-center px-6 py-16">
      <h1 className="display max-w-3xl text-center text-[clamp(1.6rem,4.4vw,3rem)] leading-[1.15] text-fg">
        {HOLDING_MESSAGE}
      </h1>
    </div>
  );
}
