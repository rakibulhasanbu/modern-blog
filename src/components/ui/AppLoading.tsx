const AppLoading = () => {
  return (
    <div className="bg-white w-full h-[80dvh] flex items-center justify-center">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          className={`block size-5 bg-purple/50 rounded-sm mr-2 mb-2 float-left relative ${
            index % 4 === 0
              ? "animate-wave_23 delay-0"
              : index % 4 === 1
              ? "animate-wave_23 delay-200"
              : index % 4 === 2
              ? "animate-wave_23 delay-400"
              : "animate-wave_23 delay-600"
          }`}
        />
      ))}
    </div>
  );
};

export default AppLoading;
