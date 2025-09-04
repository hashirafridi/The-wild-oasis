import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useSettings } from './useSettings';
import Spinner from "../../ui/Spinner";
import useUpdateSetting from "./useUpdateSetting"
function UpdateSettingsForm() {
  const { isLoading, settings } = useSettings();
  const { isUpdating , updateSetting }= useUpdateSetting();
  //// so first its undefined the settings bcz its fething you can do multiple tricks i return first the spinned other sol is in video 14 react query folder
  if (isLoading) return <Spinner />;
  // const { minBookingLength , maxBookingLength , maxGuestsPerBooking , breakfastPrice } = settings || {};
  const { minBookingLength, maxBookingLength, maxGuestsPerBooking, breakfastPrice } = settings;
  function handleUpdate(e,field) {
    let { value } = e.target;
    if (!value) return;
    value = Number(value);
    updateSetting({ [field] : value})
  }
  return (

    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input defaultValue={minBookingLength} type='number' id='min-nights' 
        disabled={isUpdating}
        onBlur={(e) => handleUpdate(e , "minBookingLength")} />
      </FormRow>

      <FormRow label='Maximum nights/booking'>
        <Input defaultValue={maxBookingLength} type='number' id='max-nights' 
        disabled={isUpdating}
        onBlur={(e) => handleUpdate(e , "maxBookingLength")}/>
      </FormRow>

      <FormRow label='Maximum guests/booking'>
        <Input defaultValue={maxGuestsPerBooking} type='number' id='max-guests'
        disabled={isUpdating}
        onBlur={(e) => handleUpdate(e , "maxGuestsPerBooking")} />
      </FormRow>

      <FormRow label='Breakfast price'>
        <Input defaultValue={breakfastPrice} type='number' id='breakfast-price'
        disabled={isUpdating}
        onBlur={(e) => handleUpdate(e , "breakfastPrice")} />
      </FormRow>

    </Form>
  );
}

export default UpdateSettingsForm;
