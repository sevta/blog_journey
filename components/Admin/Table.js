import Image from "next/image";
import { useEffect } from "react";
import { useStore } from "store";

export default function Table({ data, loading, onEditClick, onDeleteClick }) {
  const { user } = useStore();

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className="overflow-x-auto">
      {loading && <div className="p-10 text-center">Loaing</div>}
      <table className="table w-full table-compact text-neutral-content">
        <thead>
          <tr>
            <th></th>
            <th>Image</th>

            <th>Title</th>
            <th>Author</th>
            <th>Description</th>
            <th>Created At</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((data, index) => (
            <tr key={index}>
              <th>{index + 1}</th>
              <td>
                <div className="w-10 h-10 relative rounded-box overflow-hidden">
                  <Image
                    layout="fill"
                    placeholder="blur"
                    blurDataURL="https://boofcv.org/images/5/5d/Kodim17_face_mean.jpg"
                    className="object-cover object-center"
                    src={data.file}
                    alt=""
                  />
                </div>
              </td>
              <td>{data.title}</td>
              <th>{data.email}</th>
              <td>
                <div className="truncate overflow-ellipsis w-72">
                  {data.description}
                </div>
              </td>
              <td>{data.createdAt}</td>
              <td>
                {data.status ? (
                  <div className="badge badge-primary">Publish</div>
                ) : (
                  <div className="badge badge-success">Publish</div>
                )}
              </td>

              <td>
                <div className="flex space-x-2">
                  {user.uid === data.author ? (
                    <>
                      <button
                        className="btn btn-xs"
                        onClick={() => onEditClick && onEditClick(data)}
                      >
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                        </svg>
                      </button>
                      <button
                        className="btn btn-xs text-xs"
                        onClick={() => onDeleteClick && onDeleteClick(data)}
                      >
                        <svg
                          className="w-4 h-4 text-red-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    </>
                  ) : (
                    <div>-</div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Job</th>
            <th>company</th>
            <th>location</th>
            <th>Last Login</th>
            <th>Favorite Color</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
