import { capitalizeWords } from '@/helpers';
import Keywords from '@/components/Keywords';

export default function Tags({ factObject }) {
  return (
    <div className="flex flex-row flex-wrap gap-2 ml-16 pl-4">
      <span className="px-2 py-0.5 bg-blue-500 rounded-lg text-sm max-w-min whitespace-nowrap">
        {factObject.factCategory.split('-').join()}
      </span>
      <span className="px-2 py-0.5 bg-amber-500 rounded-lg text-sm max-w-min whitespace-nowrap">
        {capitalizeWords(factObject.factSubcategory.split('-').join(' '))}
      </span>
      <div className="flex">
        <Keywords keywords={factObject.factKeywords} />
      </div>
    </div>
  );
}
