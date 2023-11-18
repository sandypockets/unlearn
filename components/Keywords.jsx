import { capitalizeWords } from '@/helpers';

export default function Keywords({ keywords }) {
  return keywords?.split(',').map((keyword, index) => (
    <span
      key={index}
      className="mr-2 py-0.5 px-2 bg-green-500 rounded-lg text-sm font-mono whitespace-nowrap"
    >
      {capitalizeWords(keyword.trim().replaceAll('-', ' '))}
    </span>
  ));
}
