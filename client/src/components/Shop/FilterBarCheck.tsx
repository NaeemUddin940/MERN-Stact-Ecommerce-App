import Checkbox from "@/components/Shop/Checkbox";

type filterProps = {
  title: string;
  quantity: number;
  color?: string;
};
interface filterCheckboxProps {
  mainTitle: string;
  filter: filterProps[];
}

export default function FilterCheckbox({
  mainTitle,
  filter,
}: filterCheckboxProps) {
  return (
    <div>
      <div className="px-5 py-2">
        <h5 className="text-xl my-1 font-semibold">{mainTitle}</h5>
        {filter.map((filter) => (
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              {mainTitle === "Colors" ? (
                <div className="flex items-center gap-2 text-lg">
                  <div
                    className={`${filter.color} h-5 w-5 cursor-pointer rounded-full border-gray-600 border-2`}></div>
                  <p className="text-[16px] font-medium">{filter.title}</p>
                </div>
              ) : (
                <Checkbox title={filter.title} />
              )}
            </div>
            <div className="text-sm font-medium">
              (<span className="px-1">{filter.quantity}</span>)
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
