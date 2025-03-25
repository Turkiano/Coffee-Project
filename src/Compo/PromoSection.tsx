export function PromoSection() {
  return (
    <section className="bg-[#141e20] text-white py-16 px-6">
      <div className="text-center">
        <p className="italic text-sm">Special moment</p>
        <h2 className="text-3xl font-bold tracking-wide mt-2">ABOUT US</h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-6xl mx-auto h-100%">
        {/* First Grid Item - Image */}
        <div className="relative">
          <div
            style={{
              backgroundImage: "url('https://i.postimg.cc/m2pLgN1C/2.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            className="rounded-lg w-full  h-150"
          />
        </div>
        {/* Second Grid Item - Text */}
        <div className="bg-[#141e20] text-center p-8 rounded-lg flex flex-col justify-center">
          <p className="italic text-sm">Taste perception</p>
          <h3 className="text-2xl font-bold mt-2">TRADITIONAL & MODERN</h3>
          <p className="text-gray-400 mt-4">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque.
          </p>
          <button className="mt-6 bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition w-1/2 mx-auto">
            READ MORE
          </button>
        </div>

         {/* thrid Grid Item - Image */}
         <div className="relative">
            <div
              style={{
                backgroundImage: "url('https://i.postimg.cc/50hjP51Z/1.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              className="rounded-lg w-full h-150"
            />
          </div>
      </div>
    </section>
  );
}
