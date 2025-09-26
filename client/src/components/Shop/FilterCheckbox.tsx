import Checkbox from "../ui/checkbox";

type filterProps = {
  title: string;
  quantity: number;
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
      <div className="px-5">
        <h5 className="text-xl my-1 font-semibold">{mainTitle}</h5>
        {filter.map((filter) => (
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <Checkbox title={filter.title}/>
              {/* <div className="font-meduim text-lg">{filter.title}</div> */}
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
