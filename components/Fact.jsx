import { formatUrlString } from '@/helpers';
import Tags from '@/components/Tags';

export default function Fact({ fact }) {
  return (
    <article className="flex flex-col items-center gap-2 sm:px-12">
      <div className="flex flex-row items-center">
        <img
          src={`/images/${formatUrlString(fact.factCategory)}.png`}
          className="hidden sm:block h-16 w-16 object-contain mr-2 pt-2"
        />
        <p className="mx-6">{fact.factContent}</p>
      </div>
      <div className="flex flex-row justify-start w-full px-6">
        <Tags factObject={fact} />
      </div>
    </article>
  );
}
