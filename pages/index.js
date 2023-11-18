import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ReactDatePicker from '../components/ReactDatePicker';
import SelectCategory from '@/components/SelectCategory';
import Button from '@/components/Button';
import { capitalizeWords, formatUrlString, findParentCategory, generateFactId } from '@/helpers';

export default function Home() {
  const [date, setDate] = useState(new Date(new Date().getFullYear() - 20, 0, 1));
  const [facts, setFacts] = useState([]);
  const [subcategory, setSubcategory] = useState('biology-and-genetics');
  const [previousKeywords, setPreviousKeywords] = useState({});
  const [loading, setLoading] = useState(false);

  async function postDateToAPI(date, subcategoryValue) {
    const parentCategory = findParentCategory(subcategoryValue);
    const url = '/api/unlearn';
    const categoryKeywords = previousKeywords[parentCategory] || [];
    const data = { date, subcategory: subcategory, previousKeywords: categoryKeywords };

    try {
      setLoading(true);
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      const result = await response.json();

      const newFact = {
        id: generateFactId(),
        factContent: result.content,
        factCategory: parentCategory,
        factSubcategory: subcategoryValue,
        factKeywords: result.keyword,
      };

      setFacts([newFact, ...facts]);
      setPreviousKeywords({
        ...previousKeywords,
        [parentCategory]: [...(previousKeywords[parentCategory] || []), result.keyword],
      });

      return result;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  function renderKeywords(keywords) {
    return keywords?.split(',').map((keyword, index) => (
      <span
        key={index}
        className="mr-2 py-0.5 px-2 bg-green-500 rounded-lg text-sm font-mono whitespace-nowrap"
      >
        {capitalizeWords(keyword.trim().replaceAll('-', ' '))}
      </span>
    ));
  }

  return (
    <main className="py-12">
      <div className="flex flex-col items-center">
        <h1 className="text-7xl font-bold">Unlearn</h1>
        <h4 className="text-xl font-medium">A lot's changed since you were in school</h4>
      </div>
      <section className="mt-12 flex flex-col items-center gap-0 max-w-xs mx-auto">
        <div>
          <span className="text-xs">Choose category</span>
          <SelectCategory onCategoryChange={e => setSubcategory(e.target.value)} />
        </div>
        <div className="flex flex-row justify-between w-full">
          <div className="w-full">
            <span className="text-xs">Choose year</span>
            <ReactDatePicker setDate={setDate} date={date} />
          </div>
        </div>
        <Button
          loading={loading}
          className="w-full mt-3"
          onClick={() => postDateToAPI(date.getFullYear(), subcategory)}
        >
          Find out what's changed
        </Button>
      </section>
      <section className="py-12">
        <AnimatePresence>
          {facts.map((factObject, index) => (
            <motion.div
              key={factObject.id}
              layout
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, delay: 0 }}
              className="text-white max-w-5xl my-8 mx-auto text-md font-mono flex flex-col gap-2"
            >
              <div className="flex flex-row items-center">
                <img
                  src={`/images/${formatUrlString(factObject.factCategory)}.png`}
                  className="h-16 w-16 object-contain mr-4"
                />
                <p>{factObject.factContent}</p>
              </div>
              <div className="flex flex-row flex-wrap gap-2 ml-16 pl-4">
                <span className="px-2 py-0.5 bg-blue-500 rounded-lg text-sm max-w-min whitespace-nowrap">
                  {factObject.factCategory.split('-').join()}
                </span>
                <span className="px-2 py-0.5 bg-amber-500 rounded-lg text-sm max-w-min whitespace-nowrap">
                  {capitalizeWords(factObject.factSubcategory.split('-').join(' '))}
                </span>
                <div className="flex">{renderKeywords(factObject.factKeywords)}</div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </section>
    </main>
  );
}
