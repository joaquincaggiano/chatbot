interface Props {
  title: string;
  description: string;
}
const FeatureHomeCard = ({ title, description }: Props) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h3 className="text-xl font-semibold text-blue-600 mb-3">{title}</h3>
      <p className="font-normal text-black">{description}</p>
    </div>
  );
};

export default FeatureHomeCard;
