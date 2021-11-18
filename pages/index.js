import { useEffect, useState } from "react";
import { client } from "utils/index";
import { gql } from "graphql-request";
import Image from "next/image";
import Layout from "components/Layout";
import { useStore } from "store";

/* eslint-disable @next/next/no-img-element */
export default function Homepage({ data }) {
  const [selectedId, setSelectedId] = useState(null);
  const [selected, setSelected] = useState();

  const { user } = useStore();

  function handleSelectItem(gallery, index) {
    setSelectedId(index);
    setSelected(gallery);
  }

  function handleClearSelected() {
    setSelected(null);
    setSelectedId(null);
  }

  return (
    <Layout>
      <div className="grid grid-cols-3 gap-24 md:grid-cols-1 md:gap-10 md:p-6">
        {data.galleries.map((gallery, index) => (
          <CardImage
            key={index}
            image={gallery.image?.url}
            date={gallery.date}
            description={gallery.shortDescription}
          />
        ))}
      </div>
    </Layout>
  );
}

function CardImage({ image, date, description, withRotate }) {
  return (
    <div
      className={`flex hover:scale-110 transition duration-500 group cursor-pointer w-full self-start ${
        withRotate ? "rotate-3 even:-rotate-3" : ""
      }`}
    >
      <div className="bg-white p-[1.4vw] md:p-[5vw] group-hover:shadow-2xl transition duration-500 w-full">
        <div className="aspect-w-1 aspect-h-1">
          <Image
            className="w-full h-full object-cover object-center"
            src={image}
            layout="fill"
            alt="image"
            placeholder="blur"
            blurDataURL="https://boofcv.org/images/5/5d/Kodim17_face_mean.jpg"
          />
        </div>
        <div className="p-3 text-[1.3vw] md:text-[5vw]">
          <div className="font-caveat font-semibold">{date}</div>
          <div className="font-caveat">{description}</div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const query = gql`
    {
      galleries {
        date
        shortDescription
        image {
          url
          width
          size
        }
      }
    }
  `;

  const data = await client.request(query);

  return {
    props: {
      data,
    },
  };
}
