import { StarIcon } from "@heroicons/react/24/solid";

interface StarsProps {
  rating: number;
  starSize?: number;
}

const HalfStarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-yellow-400"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M 9.049,2.927 C 9.1985626,2.4678429 9.5974148,2.2375949 9.9968701,2.2362559 l -5.9e-6,11.8199721 C 9.7915851,14.056767 9.5864369,14.120358 9.412,14.247 l -2.8,2.034 C 5.828,16.851 4.774,16.084 5.073,15.163 l 1.07,-3.292 C 6.276704,11.45883 6.1297413,11.007444 5.779,10.753 L 2.98,8.72 C 2.197,8.15 2.6,6.91 3.568,6.91 H 7.029 C 7.4619424,6.9101141 7.8457879,6.6316142 7.98,6.22 L 9.05,2.928 Z" />
  </svg>
);

const Stars = ({ rating }: StarsProps) => {
  return (
    <div className="flex text-orange">
      {[...Array(Math.floor(rating))].map((_) => (
        <StarIcon key={`star-${rating}`} className="text-yellow-400 h-5 w-5" />
      ))}
      {rating % 1 >= 0.5 && <HalfStarIcon />}
    </div>
  );
};

export default Stars;
