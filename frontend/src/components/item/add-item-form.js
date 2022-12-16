import { useRouter } from 'next/router';
import { useState } from 'react';
import ErrorList from '../common/error-list';
import ItemFormFields from './item-form-fields';

const AddItemForm = () => {
  // form data
  const [type, setType] = useState('');
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState('');

  // feedback
  const [errors, setErrors] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // router
  const router = useRouter();

  // api call
  const postItem = async () => {
    setIsLoading(true);

    const formData = new FormData();
    formData.append('type', type);
    formData.append('brand', brand);
    formData.append('model', model);
    formData.append('description', description);
    formData.append('location', location);
    formData.append('image', image);
    formData.append('price', price);

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/items`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
    });

    const json = await res.json();
    setIsLoading(false);

    if (!json.success) {
      return setErrors(json.errors);
    }
    return router.replace('/items');
  };

  // render
  return (
    <>
      {errors ? <ErrorList errors={errors} /> : ''}
      <ItemFormFields
        type={type}
        setType={setType}
        brand={brand}
        setBrand={setBrand}
        model={model}
        setModel={setModel}
        description={description}
        setDescription={setDescription}
        location={location}
        setLocation={setLocation}
        image={image}
        setImage={setImage}
        price={price}
        setPrice={setPrice}
        isLoading={isLoading}
        postItem={postItem}
        buttonText="Post Item"
      />
    </>
  );
};

export default AddItemForm;
