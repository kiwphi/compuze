import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getRequest, putRequest } from '../../util/api-requests';
import ErrorList from '../common/error-list';
import ItemFormFields from './item-form-fields';

const EditItemForm = () => {
  // router
  const router = useRouter();
  const { itemId } = router.query;

  // feedback
  const [isLoading, setIsLoading] = useState(true);

  // pre-filled form data
  const [newType, setNewType] = useState('');
  const [newBrand, setNewBrand] = useState('');
  const [newModel, setNewModel] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newImage, setNewImage] = useState('');
  const [newPrice, setNewPrice] = useState('');

  // image-src
  const [imageSrc, setImageSrc] = useState('');

  // prefill form once query params are ready
  useEffect(() => {
    if (!router.isReady) {
      return;
    }
    (async () => {
      const json = await getRequest(`${process.env.NEXT_PUBLIC_API_URL}/items/${itemId}`);
      setNewType(json.data.item.type);
      setNewBrand(json.data.item.brand);
      setNewModel(json.data.item.model);
      setNewDescription(json.data.item.description);
      setNewLocation(json.data.item.location);
      setNewPrice(json.data.item.price);
      setImageSrc(json.data.item.image_src);
      setIsLoading(false);
    })();
  }, [itemId]);

  // feedback & auth
  const [errors, setErrors] = useState(false);

  // api call
  const editItem = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('type', newType);
    formData.append('brand', newBrand);
    formData.append('model', newModel);
    formData.append('description', newDescription);
    formData.append('location', newLocation);
    formData.append('image', newImage);
    formData.append('price', newPrice);

    const json = await putRequest(`${process.env.NEXT_PUBLIC_API_URL}/items/${itemId}`, formData);

    if (!json.success) {
      setIsLoading(false);
      return setErrors(json.errors);
    }
    return router.replace(`/items/${itemId}`);
  };

  // render
  return (
    <>
      {errors ? <ErrorList errors={errors} /> : ''}

      <ItemFormFields
        type={newType}
        setType={setNewType}
        brand={newBrand}
        setBrand={setNewBrand}
        model={newModel}
        setModel={setNewModel}
        description={newDescription}
        setDescription={setNewDescription}
        location={newLocation}
        setLocation={setNewLocation}
        image={newImage}
        imageSrc={imageSrc}
        setImage={setNewImage}
        price={newPrice}
        setPrice={setNewPrice}
        isLoading={isLoading}
        postItem={editItem}
        buttonText="Edit Item"
      />
    </>
  );
};

export default EditItemForm;
