import supabase, { supabaseUrl } from "./supaBase";

export async function getCabins() {

  let { data, error } = await supabase
    .from('cabins')
    .select('*')
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded");
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase
    .from('cabins')
    .delete()
    .eq('id', id)
  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted");
  }
  return data;
}
export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl)
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll("/", "");
  const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
  // create/edit cabins
  let query = supabase
    .from('cabins');
  // create 
  if (!id) query = query
    .insert([{ ...newCabin, image: imagePath }])
  if (id) query = query
    .update({ ...newCabin, image: imagePath }).eq("id", id);

  const { data, error } = await query.select().single();
  if (error) {
    console.error(error);
    throw new Error("Cabin can not be created");
  }

  // upload image
  if (hasImagePath) return data;
  const { error: storageError } = await supabase
    .storage
    .from('cabin-images')
    .upload(imageName, newCabin.image);
  // if error in uploading image then delete the cabin
  if (storageError) {
    const { error: imageUploadingError } = await supabase
      .from('cabins')
      .delete()
      .eq('id', data.id)
    if (imageUploadingError) {
      console.error(imageUploadingError);
      throw new Error("There was an error uploading the image , The cabin is not created");
    }
  }
  return data;
}