import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { LuMaximize2 } from "react-icons/lu";

const ImageGallery = ({
  images,
  displayTitle,
  currentImageIndex,
  setCurrentImageIndex,
  handlePrevImage,
  handleNextImage,
}) => {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full max-w-lg h-[450px] bg-surface-soft border border-line rounded-3xl flex items-center justify-center overflow-hidden group shadow-sm">
        <button className="absolute top-4 right-4 p-2 bg-card rounded-full border border-line shadow-sm text-ink-faint hover:text-ink transition-colors">
          <LuMaximize2 size={16} />
        </button>

        {images.length > 0 ? (
          <>
            <img
              src={images[currentImageIndex]?.url || images[currentImageIndex]}
              alt={displayTitle}
              className="max-h-[85%] max-w-[85%] object-contain p-4 transition-all duration-300"
            />

            {images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 p-2 text-gold hover:text-gold-deep transition-all opacity-0 group-hover:opacity-100"
                >
                  <FaChevronLeft size={24} />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 p-2 text-gold hover:text-gold-deep transition-all opacity-0 group-hover:opacity-100"
                >
                  <FaChevronRight size={24} />
                </button>
              </>
            )}
          </>
        ) : (
          <div className="text-ink-faint">No images available</div>
        )}
      </div>

      <div className="flex gap-3 mt-4 overflow-x-auto max-w-md py-1">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentImageIndex(idx)}
            className={`w-20 h-20 border rounded-xl overflow-hidden flex-shrink-0 bg-card transition-all ${
              currentImageIndex === idx
                ? "border-gold ring-2 ring-gold-light"
                : "border-line"
            }`}
          >
            <img
              src={img?.url || img}
              alt=""
              className="w-full h-full object-contain p-1"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;