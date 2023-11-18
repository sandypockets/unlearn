import { formatUrlString } from '@/helpers';
import Tags from '@/components/Tags';

export default function Fact({ fact }) {
  return (
    <article className="flex flex-col gap-2">
      <div className="flex flex-row items-center">
        <img
          src={`/images/${formatUrlString(fact.factCategory)}.png`}
          className="h-16 w-16 object-contain mr-4"
        />
        <p>{fact.factContent}</p>
      </div>
      <Tags factObject={fact} />
    </article>
  );
}
