export default function Loading() {
  return (
    <div
      id="loading"
      className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-50 flex justify-center items-center"
    >
      <div
        id="spinner"
        className="h-12 w-12 border-4 border-t-transparent border-white rounded-full animate-spin"
      />
    </div>
  );
}
