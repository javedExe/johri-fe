export default function JewelerWelcomeMobile({
  isMobile = {},
  setIsMobile = {},
}) {
  return (
    <div className="w-full max-w-[430px] h-[932px] bg-white mx-auto">
      <div className="relative h-[932px]">
        <img
          className="absolute w-full h-[932px] top-0 left-0 object-cover"
          alt="Gemini generated"
          src="https://c.animaapp.com/mcuw306ydLRLmI/img/gemini-generated-image-2wqgo2wqgo2wqgo2-2.png"
        />

        <div className="absolute w-12 h-[43px] top-[43px] left-[150px] bg-[url(https://c.animaapp.com/mcuw306ydLRLmI/img/union.svg)] bg-[100%_100%]" />

        <div className="absolute top-[41px] left-52 [font-family:'Open_Sans',Helvetica] font-semibold text-black text-[32px] tracking-[0] leading-[normal]">
          Johri
        </div>

        <p className="absolute w-[380px] top-[408px] left-4 [font-family:'SF_Pro_Text-Medium',Helvetica] font-medium text-white text-[32px] tracking-[0] leading-[38.4px]">
          Unlock the World of Johri.
        </p>

        <p className="text-white top-[485px] left-4 [font-family:'SF_Pro_Text-Regular',Helvetica] font-normal  text-base tracking-[0] leading-8">
          Log in for personalized picks and shimmering surprises.
        </p>

        <p className="absolute w-[326px] top-[639px] left-4 [font-family:'Inter',Helvetica] font-medium text-white text-[32px] tracking-[0] leading-[normal]">
          Unlock the World of Johri.
        </p>

        <p className="absolute w-[398px] top-[727px] left-4 [font-family:'Inter',Helvetica] font-normal text-white text-base tracking-[0] leading-7">
          Join us for personalized picks and shimmering surprises.
        </p>

        <button
          onClick={() => setIsMobile(false)}
          className="absolute w-[398px] h-12 top-[836px] left-4 bg-[#babadd] rounded-lg overflow-hidden border border-solid border-[#dfd5f5] cursor-pointer hover:bg-[#a9a9cc] transition-colors"
        >
          <div className="absolute top-3 left-[158px] [font-family:'Inter',Helvetica] font-bold text-[#212144] text-sm tracking-[0] leading-[22px] whitespace-nowrap">
            Get Started
          </div>
        </button>

        <img
          className="absolute w-20 h-[39px] top-[564px] left-4"
          alt="Logo mobile"
          src="https://c.animaapp.com/mcuw306ydLRLmI/img/logo-v2---mobile.png"
        />
      </div>
    </div>
  );
}
