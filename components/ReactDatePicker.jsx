import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ButtonWithRef from '@/components/ButtonWithRef';

export default function ReactDatePicker({ date, setDate }) {
  return (
    <DatePicker
      selected={date} // use the date from the state
      onChange={date => {
        setDate(new Date(date.getFullYear(), 0, 1));
      }}
      showYearPicker
      dateFormat="yyyy"
      yearItemNumber={9}
      // Disable other pickers
      showMonthDropdown={false}
      showMonthYearDropdown={false}
      showFullMonthYearPicker={false}
      showTwoColumnMonthYearPicker={false}
      showFourColumnMonthYearPicker={false}
      showQuarterYearPicker={false}
      customInput={<ButtonWithRef>Choose year</ButtonWithRef>}
    />
  );
}
