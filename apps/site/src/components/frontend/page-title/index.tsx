const PageTitle = ({
  title,
  excerpt,
  image,
}: {
  title?: string;
  excerpt?: any;
  image?: any;
}) => {
  return (
    <section
      className="relative bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: image
          ? `url(${image || "/assets/img/findjob-banner-bg.svg"})`
          : "url(/assets/img/findjob-banner-bg.svg)",
      }}
    >
      <div className="absolute w-full h-full left-0 top-0 z-2 bg-themePrimary/70" />
      <div className="container p-16">
        <div className="w-10/12 m-auto z-4 relative pt-10 pb-7">
          <div className="text-center">
            <h1 className="text-xxl xl:text-xxxl font-bold text-white text-center leading-none mb-6">
              {title ? title : "Page Title"}
            </h1>
            {excerpt && (
              <p className="text-xs text-white text-center leading-relaxed mb-6">
                {excerpt}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageTitle;
