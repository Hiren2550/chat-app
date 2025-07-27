export const SidebarSkeleton = ({ length }) => {
  return Array.from({ length: length }).map((_, index) => (
    <div
      key={index}
      className="flex items-center gap-3 p-2 animate-pulse bg-gray-100 rounded"
    >
      <div className="w-8 h-8 rounded-full bg-gray-300" />
      <div className="flex flex-col gap-1">
        <div className="w-32 h-3 bg-gray-300 rounded" />
        <div className="w-20 h-2 bg-gray-200 rounded" />
      </div>
    </div>
  ));
};
