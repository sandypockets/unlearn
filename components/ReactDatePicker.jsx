import DatePicker from 'react-datepicker';
import ButtonWithRef from '@/components/ButtonWithRef';

export default function ReactDatePicker({ date, setDate }) {
  const maxDate = new Date();
  const minDate = new Date(maxDate.getFullYear() - 75, 0, 1);

  return (
    <DatePicker
      selected={date}
      onChange={newDate => {
        setDate(new Date(newDate.getFullYear(), 0, 1));
      }}
      showYearPicker
      dateFormat="yyyy"
      yearItemNumber={20}
      minDate={minDate}
      maxDate={maxDate}
      showMonthDropdown={false}
      showMonthYearDropdown={false}
      showFullMonthYearPicker={false}
      showTwoColumnMonthYearPicker={false}
      showFourColumnMonthYearPicker={false}
      showFourColumnYearPicker={true}
      showQuarterYearPicker={false}
      customInput={<ButtonWithRef>{date.getFullYear()}</ButtonWithRef>}
    />
  );
}
