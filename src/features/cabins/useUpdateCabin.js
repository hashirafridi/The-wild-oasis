import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export default function useUpdateCabin() {
  const queryClient = useQueryClient();

 const { isLoading: isUpdating, mutate: updateCabin } = useMutation({
    mutationFn: ({ newcabinData , id })=> createEditCabin(newcabinData , id),
    onSuccess: () => {
      toast.success("cabin successfully updated");
      queryClient.invalidateQueries({
        queryKey: ["cabins"]
      });
    },
    onError: (err) => toast.error(err.message)
  });
  return { isUpdating , updateCabin }
}
