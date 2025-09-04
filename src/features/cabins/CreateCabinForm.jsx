/* eslint-disable react/prop-types */
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import { Textarea } from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { useForm } from "react-hook-form";
import useCreateCabin from "./useCreateCabin";
import useUpdateCabin from "./useUpdateCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId)
  const { register, handleSubmit, reset, getValues, formState } = useForm({ defaultValues: isEditSession ? editValues : {} });
  const { errors } = formState;

  const { isCreating, createCabin } = useCreateCabin();
  const { isUpdating, updateCabin } = useUpdateCabin();
  const isWorking = isCreating || isUpdating;
  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (!isEditSession) createCabin({ ...data, image: image }, {
      onSuccess: () => {
        reset()
        onCloseModal?.()
      }
    });
    else updateCabin({ newcabinData: { ...data, image: image }, id: editId }, {
      onSuccess: () => {
        reset()
        onCloseModal?.()
      }
    })
  }
  function onError(err) {
    // console.log(err);
  }
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type={onCloseModal ? "modal" : "regular"}>
      <FormRow label="name" error={errors?.name?.message}>
        <Input type="text" disabled={isWorking} id="name" {...register("name",
          { required: "This field is required" })} />
      </FormRow>

      <FormRow label="maxCapacity" error={errors?.maxCapacity?.message}>
        <Input type="number" disabled={isWorking} id="maxCapacity" {...register("maxCapacity",
          {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be atleast 1"
            }
          })} />
      </FormRow>

      <FormRow label="regularPrice" error={errors?.regularPrice?.message}>
        <Input type="number" disabled={isWorking} id="regularPrice" {...register("regularPrice",
          {
            required: "This field is required",
            min: {
              value: 1,
              message: "Capacity should be atleast 1"
            }
          })} />
      </FormRow>

      <FormRow label="discount" error={errors?.discount?.message}>
        <Input type="number" disabled={isWorking} id="discount" {...register("discount",
          {
            validate: (value) => {
              return value <= getValues().regularPrice || "Discount should be greater then Regular Price"
            }
          })} defaultValue={0} />
      </FormRow>

      <FormRow label="description" error={errors?.description?.message}>
        <Textarea type="number" disabled={isWorking} id="description" defaultValue="" {...register("description", { required: "This field is required" })} />
      </FormRow>

      <FormRow label="Cabin Photo">
        <FileInput id="image" disabled={isWorking} accept="image/*" {...register("image", { required: isEditSession ? false : "This field is required" })} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button disabled={isWorking} variation="secondary" onClick={() => onCloseModal?.()} type="reset">
          Cancel
        </Button>
        <Button disabled={isWorking}>{isEditSession ? "Edit Cabin" : "Create New Cabin"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
