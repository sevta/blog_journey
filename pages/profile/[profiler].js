import Image from "next/image";
import Layout from "components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [loading, setIsLoading] = useState(true);
  const router = useRouter();
  const { profiler } = router.query;

  const smpleImages = [
    "https://cdn.dribbble.com/users/33073/screenshots/15167237/media/6279585ceccb919e765397196ebacc3b.png",
    "https://cdn.dribbble.com/users/6234/screenshots/16879918/media/4d31f49a1bbe86dc7aa522b8e354d747.png",
    "https://cdn.dribbble.com/users/4898370/screenshots/16876427/media/1c6a8162a8921e7ccbd3777f980647d7.png?compress=1&resize=1600x1200",
    "https://cdn.dribbble.com/users/434375/screenshots/16879690/media/44a5bec685468311e7d56a778f0a8708.jpg",
    "https://cdn.dribbble.com/users/5014011/screenshots/16876423/media/8509deaeb8ca450cc566c9b9773da122.png",
  ];

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <Layout showNavbar={false} showBadge={false} noPadding>
      <div data-theme="light">
        <Heading profile={profiler} />
        <div className="grid grid-cols-4 gap-2 sm:grid-cols-1 mt-20">
          {smpleImages.map((image, index) => (
            <div
              key={index}
              className={`relative overflow-hidden aspect-w-1 aspect-h-1 rounded group ${
                index === 0
                  ? "col-span-2 sm:col-span-1 row-span-2 sm:row-span-1"
                  : ""
              }`}
            >
              {loading ? (
                <div className="w-full h-[600px] bg-base-300 animate-pulse group-hover:scale-110 transition duration-150"></div>
              ) : (
                <Image
                  className="object-cover object-center"
                  src={image}
                  alt="image"
                  layout="fill"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

function Heading({ profile }) {
  return (
    <div className="heading flex items-center justify-center flex-col">
      <Avatar />
      <div className="font-medium mt-2">Hi, im {profile} 🤘</div>
      <div className="text-5xl font-semibold text-center mt-8 tracking-tighter">
        <div>Building digital</div>
        <div>products, brands, and</div>
        <div>experience.</div>
      </div>
      <div className="mt-8 text-sm text-center leading-6">
        a <b>Designer</b> and <b>Front end developer</b> in ID <br />
        I specialize in UI/UX Design, Responsive Web Design, <br />
        and Viuual Development.
      </div>
      <div className="mt-8">
        <button className="btn btn-secondary rounded-full text-xs">
          connect with me
        </button>
      </div>
    </div>
  );
}

function Avatar() {
  return (
    <div className="w-14 h-14 relative rounded-full bg-teal-400 overflow-hidden">
      <Image
        className="object-cover object-center"
        src="https://scontent.fcgk29-1.fna.fbcdn.net/v/t31.18172-1/c0.0.240.240a/p240x240/17097228_10209875845831028_913193478802097687_o.jpg?_nc_cat=108&ccb=1-5&_nc_sid=7206a8&_nc_eui2=AeEw3-aXTn5wkeIRbk2EJjzPtDK8U3bxkra0MrxTdvGSttXNmeYhvoJaFUL9XeVcxS8&_nc_ohc=e--BxIUcju8AX-_0mtn&_nc_ht=scontent.fcgk29-1.fna&oh=4b7b3c68526f31842780d7cc418230bf&oe=61B8DAB8"
        layout="fill"
        alt="avatar"
      />
    </div>
  );
}
