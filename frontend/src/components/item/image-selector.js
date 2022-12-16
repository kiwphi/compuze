import Image from 'next/image';

const ImageSelector = ({ image, setImage, imageSrc, isLoading }) => {
  const getImageSrc = () => {
    // thumbnail priority for the image selected on the image browser
    if (image) {
      return URL.createObjectURL(image);
    }
    // in case of item-editing (imageSrc is set), display the item's
    // original imageSrc in case there is one (imageSrc !== 'default')
    if (imageSrc && imageSrc !== 'default') {
      return `${process.env.NEXT_PUBLIC_API_URL}/public/images/${imageSrc}`;
    }
    // if both cases above fail, display the default placeholder image
    return '/add-image.png';
  };
  return (
    <>
      <div className="item-image-upload">
        <label htmlFor="image">
          <Image alt="Item Image" layout="fill" objectFit="cover" src={getImageSrc()} />
        </label>
        <input
          id="image"
          type="file"
          name="image"
          accept="image/png, image/jpeg"
          onChange={(e) => setImage(e.target.files[0])}
          disabled={isLoading}
        />
      </div>
    </>
  );
};

export default ImageSelector;
