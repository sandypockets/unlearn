import { useState } from 'react';
import { findParentCategory, generateFactId } from '@/helpers';
import Form from '@/components/Form';
import Facts from '@/components/Facts';

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

  async function handleSubmit(e) {
    e.preventDefault();
    await postDateToAPI(date, subcategory);
  }

  return (
    <main className="flex flex-col items-center mx-auto py-12 min-h-screen">
      <div className="flex flex-col items-center mx-6">
        <h1 className="text-5xl sm:text-7xl font-bold">Unlearn</h1>
        <h4 className="text-lg sm:text-xl font-medium text-center">
          A lot's changed since you were in school
        </h4>
      </div>
      <Form
        handleSubmit={handleSubmit}
        date={date}
        setDate={setDate}
        setSubcategory={setSubcategory}
        loading={loading}
      />
      <Facts facts={facts} />
    </main>
  );
}
