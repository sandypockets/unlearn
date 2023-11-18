import SelectCategory from '@/components/SelectCategory';
import ReactDatePicker from '@/components/ReactDatePicker';
import Button from '@/components/Button';

export default function Form({ handleSubmit, setSubcategory, setDate, date, loading }) {
  return (
    <section className="mt-12 flex flex-col items-center gap-0 max-w-xs mx-auto px-6 sm:px-0">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="select-category" className="text-xs">
            Choose category
          </label>
          <SelectCategory onCategoryChange={e => setSubcategory(e.target.value)} />
        </div>
        <div className="flex flex-row justify-between w-full">
          <div className="w-full">
            <label className="text-xs">Choose year</label>
            <ReactDatePicker setDate={setDate} date={date} />
          </div>
        </div>
        <Button loading={loading} type="submit" className="w-full mt-3">
          Find out what's changed
        </Button>
      </form>
    </section>
  );
}
