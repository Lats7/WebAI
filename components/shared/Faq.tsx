import { Plus } from 'lucide-react';
import { JsonLd } from '@/components/shared/JsonLd';
import { faqData } from '@/lib/seo';

interface FaqProps {
  items: readonly { question: string; answer: string }[];
}

/** Questions and answers. Native disclosure elements, so they work without JavaScript. */
export function Faq({ items }: FaqProps) {
  return (
    <>
      <JsonLd data={faqData(items)} />
      <div className="border-t border-edge">
        {items.map((item) => (
          <details key={item.question} className="faq group border-b border-edge">
            <summary className="px-5 py-6 sm:px-8 lg:px-14">
              <h3 className="display text-lg text-fg sm:text-xl">{item.question}</h3>
              <span className="faq-mark grid h-8 w-8 shrink-0 place-items-center border border-edge-strong text-fg-2 mc:rounded-[3px] ws:rounded-full">
                <Plus size={15} aria-hidden="true" />
              </span>
            </summary>
            <p className="max-w-3xl px-5 pb-7 leading-relaxed text-fg-2 sm:px-8 lg:px-14">{item.answer}</p>
          </details>
        ))}
      </div>
    </>
  );
}
