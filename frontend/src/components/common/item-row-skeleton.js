const ItemRowSkeleton = () => {
  return (
    <div className="item-row">
      <div className="skeleton skeleton-picture"></div>
      <div className="item-text">
        <div className="skeleton skeleton-first-row" />
        <div className="skeleton skeleton-second-row" />
      </div>
    </div>
  );
};

export default ItemRowSkeleton;
