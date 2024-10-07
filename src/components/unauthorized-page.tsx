export function Unauthorized() {
  return (
    <div className=" min-w-full h-[50vh] flex flex-col justify-center items-center justify-center">
      <p className="block text-3xl">OOPs</p>
      <p className="block text-7xl">401</p>
      <p className="text-[red] text-5xl">Unauthorized page.</p>
    </div>
  ) 
}
