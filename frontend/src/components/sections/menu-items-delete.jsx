import { mutate } from "swr";
import useFetch from "../hook/fetch";
import { Button } from "../ui/button";
import Loader from "../ui/loader";

const MenuItemDelete = ({item}) => {
  const {loading:deleteLoading, fetcher:deleteCall } = useFetch()

  const handleDeleteCategory = async (categoryId) => {
    await deleteCall(() =>
      fetch(`/api/menu-items/${categoryId}`, {
        method: "DELETE",
      })
    );
    mutate('/api/menu-items');
  };

  return (
    <Button
      variant='destructive'
      disabled={deleteLoading}
      size='sm'
      onClick={() => handleDeleteCategory(item.id)}
    >
      {!deleteLoading ? "Delete" : <Loader className='text-primary-foreground'/>}
    </Button>
  );
};

export default MenuItemDelete;
