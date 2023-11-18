import { capitalizeWords } from '@/helpers';

export default function Keywords({ keywords, className }) {
  return (
    <div className="flex flex-row flex-wrap gap-2">
      {keywords?.split(',').map((keyword, index) => (
        <span
          key={index}
          className={`${className} py-0.5 px-2 rounded-lg text-sm font-mono whitespace-nowrap`}
        >
          {capitalizeWords(keyword.trim().replaceAll('-', ' '))}
        </span>
      ))}
    </div>
  );
}
