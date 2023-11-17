import { useState } from 'react';
import ReactDatePicker from '../components/ReactDatePicker';
import SelectCategory from '@/components/SelectCategory';
import Button from '@/components/Button';

export default function Home() {
  const [date, setDate] = useState(new Date());
  const [facts, setFacts] = useState([]);
  const [category, setCategory] = useState('astronomy');
  const [previousKeywords, setPreviousKeywords] = useState([]);

  async function postDateToAPI(date, category) {
    const url = '/api/unlearn';
    const data = { date, category, previousKeywords };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {'Content-Type': 'application/json',},
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const result = await response.json();

      console.log('Result: ', result);
      setFacts([result?.content, ...facts]);
      setPreviousKeywords([...previousKeywords, result?.keyword]);
      return result;
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main>
      <div>
        <h1 className="text-6xl">Unlearn</h1>
        <h4 className="text-xl">A lot's changed since you were in school</h4>
      </div>
      <p>What's new since {date.getFullYear()}?</p>
      <section className="flex flex-col gap-2">
        <div>
          <span>Choose your graduating year</span>
          <SelectCategory onCategoryChange={e => setCategory(e.target.value)} />
        </div>
        <div className="flex flex-row gap-2">
          <div>
            <ReactDatePicker setDate={setDate} />
          </div>
          <Button onClick={() => postDateToAPI(date.getFullYear(), category)}>Go!</Button>
        </div>
      </section>
      {facts?.map((fact, index) => (
        <p key={index} className="text-white max-w-5xl my-4 mx-auto text-md font-mono">
          {fact}
        </p>
      ))}
    </main>
  );
}
