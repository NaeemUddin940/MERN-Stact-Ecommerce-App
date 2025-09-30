export default function AddHomeSliders() {
  return (
    <div className="p-5 space-y-5">
      <div className="grid grid-cols-1 lg:grid-cols-12 h-[400px] lg:grid-rows-6 gap-4">
        <div className="lg:col-span-8 lg:row-span-6 bg-red-100"></div>
        <div className="lg:col-span-4 lg:row-span-3 lg:col-start-9 bg-blue-100">
          2
        </div>
        <div className="lg:col-span-4 lg:row-span-3 lg:col-start-9 lg:row-start-4 bg-green-100">
          3
        </div>
      </div>

      <div className="grid grid-cols-12 grid-rows-3 gap-4 h-[200px]">
        <div className="col-span-8 row-span-3 bg-violet-100">1</div>
        <div className="col-span-4 row-span-3 col-start-9 bg-pink-100">2</div>
      </div>
    </div>
  );
}
