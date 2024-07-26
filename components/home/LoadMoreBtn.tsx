type TLoadMoreBtn = {
  state: any;
  stateFunction: (page: number) => void;
  additionalParams?: object;
};

const LoadMoreBtn = ({
  state,
  stateFunction,
  additionalParams,
}: TLoadMoreBtn) => {
  if (state !== null && state?.meta?.totalPage > state?.meta?.page) {
    return (
      <button
        onClick={() => stateFunction(state?.meta?.page + 1)}
        className="text-dark-grey p-2 px-3 hover:bg-grey/30 rounded-md flex items-center gap-2"
      >
        Load More
      </button>
    );
  }
};

export default LoadMoreBtn;
