import { capitalizeWords } from '@/helpers';
import Keywords from '@/components/Keywords';

export default function Tags({ factObject }) {
  return (
    <div className="flex flex-row flex-wrap gap-2 sm:ml-16">
      <span className="px-2 py-0.5 bg-blue-500 rounded-lg text-sm max-w-min whitespace-nowrap">
        {factObject.factCategory.split('-').join()}
      </span>
      <span className="px-2 py-0.5 bg-teal-600 rounded-lg text-sm max-w-min whitespace-nowrap">
        {capitalizeWords(factObject.factSubcategory.split('-').join(' '))}
      </span>
      <div className="flex">
        <Keywords className="bg-red-500" keywords={factObject.factKeywords} />
      </div>
    </div>
  );
}
