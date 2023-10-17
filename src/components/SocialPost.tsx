export interface SocialPostProps {
  post: {
    text: string;
    photoUrls: string[];
  };
}

const SocialPost = ({ post }: SocialPostProps) => {
  const photoUrl = post.photoUrls[0];

  return (
    <div className="w-64 h-64 relative group">
      <div className="absolute inset-0 bg-slate-400 opacity-0 group-hover:opacity-20"></div>
      <div className="text-base text-white opacity-0 group-hover:opacity-20">
        {post.text}
      </div>
      <img
        className="h-full w-full object-cover object-center"
        key={photoUrl}
        src={photoUrl}
      />
    </div>
  );
};

export default SocialPost;
