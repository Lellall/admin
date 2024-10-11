import { useState, useEffect } from "react";
import styled from "styled-components";

const CategoryCardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease;
  cursor: pointer;
  background-color: #fff;
  
  &:hover {
    transform: scale(1.03);
  }
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 150px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-bottom: 1px solid #e2e8f0;
`;

const CardContent = styled.div`
  padding: 8px;
  text-align: center;
`;

const CategoryName = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #1a202c;
`;

const LoadingSpinner = styled.div`
  text-align: center;
  margin-top: 16px;
`;

const CategoryModal = ({ isModalOpen, setIsModalOpen, categories }) => {
  const [visibleCategories, setVisibleCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const loadMoreCategories = () => {
    if (loading || !hasMore) return;

    setLoading(true);
    // Simulate an API call to load more categories
    setTimeout(() => {
      const currentLength = visibleCategories.length;
      const newCategories = categories.slice(currentLength, currentLength + 12);

      setVisibleCategories((prev) => [...prev, ...newCategories]);
      setHasMore(newCategories.length > 0);
      setLoading(false);
    }, 1000);
  };

  const handleScroll = (e) => {
    const { scrollTop, clientHeight, scrollHeight } = e.target;
    if (scrollHeight - scrollTop <= clientHeight + 100 && !loading) {
      loadMoreCategories();
    }
  };

  useEffect(() => {
    if (isModalOpen) {
      // Load initial set of categories
      setVisibleCategories(categories?.slice(0, 12));
      setHasMore(categories.length > 12);
    }
  }, [isModalOpen, categories]);

  return (
    <div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div
            className="bg-white rounded-lg m-2 overflow-auto max-h-[85vh] w-full max-w-5xl p-4 relative"
            onScroll={handleScroll}
          >
            {/* Close button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900"
            >
              ✕
            </button>

            {/* Modal content */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 p-3">
              {visibleCategories?.map((category) => (
                <CategoryCardWrapper key={category.id}>
                  <ImageWrapper>
                    <Image src={category.imageUrl} alt={category.name} />
                  </ImageWrapper>
                  <CardContent>
                    <CategoryName>{category.name}</CategoryName>
                  </CardContent>
                </CategoryCardWrapper>
              ))}
            </div>

            {/* Loading Spinner */}
            {loading && (
              <LoadingSpinner>
                <span>Loading...</span>
              </LoadingSpinner>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryModal;
