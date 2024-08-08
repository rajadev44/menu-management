import { mutate } from "swr";
import useFetch from "../hook/fetch";
import { Button } from "../ui/button";
import Loader from "../ui/loader";

const CategoryDelete = ({category}) => {
  const {loading:deleteLoading, fetcher:deleteCall } = useFetch()

  const handleDeleteCategory = async (categoryId) => {
    await deleteCall(() =>
      fetch(`/api/categories/${categoryId}`, {
        method: "DELETE",
      })
    );
    mutate('/api/categories');
  };

  return (
    <Button
      variant='destructive'
      disabled={deleteLoading}
      size='sm'
      onClick={() => handleDeleteCategory(category.id)}
    >
      {!deleteLoading ? "Delete" : <Loader className='text-primary-foreground'/>}
    </Button>
  );
};

export default CategoryDelete;
